import { NextResponse } from "next/server";
import { z } from "zod";
import { sendQuoteNotification, sendQuoteConfirmation } from "@/lib/resend";

// Validation schema matching the frontend form validation exactly
const productRowSchema = z.object({
  product: z.string().min(1, "Select a product"),
  quantity: z.string().or(z.number()).transform((val) => Number(val)).pipe(z.number().int().min(1, "Min quantity is 1")),
});

const quotationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone is required"),
  organization: z.string().min(2, "Organization is required"),
  designation: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  products: z.array(productRowSchema).min(1, "Add at least one product"),
  notes: z.string().optional(),
  termsAccepted: z.boolean(),
  accurateInfo: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Parse and validate incoming form data
    const result = quotationSchema.safeParse(body);
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
    // 1. Send Admin Quote Notification email first
    await sendQuoteNotification(result.data);

    // 2. Send Customer Confirmation email second
    await sendQuoteConfirmation(result.data.name, result.data.email);

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
    });
  } catch (error: any) {
    console.error("Error in request-quote API route:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message || "An unexpected error occurred while processing your quote request.",
      },
      { status: 500 }
    );
  }
}
