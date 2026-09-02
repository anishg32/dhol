import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendAdminWhatsAppNotification } from "@/lib/whatsapp";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  mobileNumber: z.string().min(10, "Valid mobile number is required"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  email: z.string().email("Valid email is required"),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Date is required"),
  eventStartTime: z.string().min(1, "Start time is required"),
  eventEndTime: z.string().min(1, "End time is required"),
  eventLocation: z.string().min(1, "Location is required"),
  expectedCrowd: z.string().min(1, "Expected crowd is required"),
  requirements: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check for conflicts
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        eventDate: data.eventDate,
        status: "Confirmed",
      },
    });

    const isConflict = conflictingBookings.some((booking) => {
      // Basic time overlap check for HH:mm strings
      return (
        data.eventStartTime < booking.eventEndTime &&
        data.eventEndTime > booking.eventStartTime
      );
    });

    if (isConflict) {
      return NextResponse.json(
        { error: "This date/time is currently unavailable. Please choose another time." },
        { status: 409 }
      );
    }

    // Generate unique Booking ID (e.g., DHOL-YYYY-XXXX)
    const year = new Date().getFullYear();
    const count = await prisma.booking.count();
    const bookingId = `DHOL-${year}-${String(count + 1).padStart(4, "0")}`;

    // Create booking
    const newBooking = await prisma.booking.create({
      data: {
        ...data,
        bookingId,
        status: "Pending",
        notificationStatus: "pending",
      },
    });

    // Send WhatsApp notification
    const notificationSuccess = await sendAdminWhatsAppNotification(newBooking);

    // Update notification status
    await prisma.booking.update({
      where: { id: newBooking.id },
      data: { notificationStatus: notificationSuccess ? "sent" : "failed" },
    });

    return NextResponse.json(
      { success: true, bookingId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Unable to submit your booking right now. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { customerName: { contains: search } },
        { bookingId: { contains: search } },
        { mobileNumber: { contains: search } },
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
