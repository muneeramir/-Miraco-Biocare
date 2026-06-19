import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactNotification, sendCustomerConfirmation } from "@/lib/resend";

// Validation schema matching the frontend form schema exactly
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  organization: z.string().min(2, "Organization is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Parse and validate incoming form data
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Call Resend email sending utilities sequentially
    // 1. Send Admin email first
    await sendContactNotification(result.data);

    // 2. Send Customer confirmation second
    await sendCustomerConfirmation(result.data.name, result.data.email);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message || "An unexpected error occurred while sending your message.",
      },
      { status: 500 }
    );
  }
}
