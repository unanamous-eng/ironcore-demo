import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { trialSignups } from "@/db/schema";
import { trialFormSchema, formatZodErrors } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = trialFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: formatZodErrors(result.error),
        },
        { status: 400 }
      );
    }

    const { name, email, phone } = result.data;

    await db.insert(trialSignups).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
    });

    return NextResponse.json(
      { success: true, message: "14-day free trial activated successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Trial signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
