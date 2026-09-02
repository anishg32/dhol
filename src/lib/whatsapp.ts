import { Booking } from "@prisma/client";

export async function sendAdminWhatsAppNotification(booking: Booking): Promise<boolean> {
  // In a real application, you would use the official WhatsApp Cloud API 
  // or a provider like Twilio here.
  // 
  // Example for WhatsApp Cloud API:
  // const token = process.env.WHATSAPP_ACCESS_TOKEN;
  // const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  // const to = process.env.WHATSAPP_RECIPIENT_NUMBER;
  
  const messageText = `
*NEW BOOKING RECEIVED*
Booking ID: ${booking.bookingId}
Customer: ${booking.customerName}
Phone: ${booking.mobileNumber}
WhatsApp: ${booking.whatsappNumber}
Email: ${booking.email}
Event: ${booking.eventType}
Date: ${booking.eventDate}
Time: ${booking.eventStartTime} - ${booking.eventEndTime}
Location: ${booking.eventLocation}
Crowd: ${booking.expectedCrowd}
Requirements: ${booking.requirements || 'None'}
Status: ${booking.status}
  `.trim();

  console.log("-----------------------------------------");
  console.log("[MOCK WHATSAPP NOTIFICATION]");
  console.log(messageText);
  console.log("-----------------------------------------");

  try {
    /* 
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: { body: messageText },
      }),
    });
    
    if (!response.ok) {
      console.error("WhatsApp API Error:", await response.text());
      return false;
    }
    */
    
    // Simulating API latency
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true; // Success
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
    return false;
  }
}
