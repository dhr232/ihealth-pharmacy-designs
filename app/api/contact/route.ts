import { NextRequest, NextResponse } from "next/server";
import { sendStaffFormAlert } from "@/lib/resend";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

interface ContactRequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  botcheck?: string;
}

export async function POST(request: NextRequest) {
  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success so they do not retry.
  if (body.botcheck) {
    return NextResponse.json({ success: true });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!firstName || !lastName) {
    return NextResponse.json({ success: false, message: "Please enter your first and last name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ success: false, message: "Please enter a valid 10-digit phone number." }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ success: false, message: "Please enter a message (up to 5000 characters)." }, { status: 400 });
  }

  const result = await sendStaffFormAlert({
    title: `Contact form message from ${firstName} ${lastName}`,
    replyTo: email,
    fields: [
      ["Name", `${firstName} ${lastName}`],
      ["Email", email],
      ["Phone", phone],
      ["Message", message],
    ],
  });

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: `We could not send your message. Please call us at ${PHARMACY_INFO.phoneDisplay}.` },
      { status: 502 }
    );
  }
  return NextResponse.json({ success: true });
}
