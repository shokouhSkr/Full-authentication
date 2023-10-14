import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";
import { createResetToken } from "@/helpers/token";
import sendEmail from "@/helpers/sendEmail";
import { resetTemplateEmail } from "@/emailTemplate/reset";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("This email address doesn't exist.", { status: 400 });
    }

    const user_id = createResetToken({
      id: user?.id.toString(),
    });

    const url = `${process.env.NEXT_PUBLIC_URL}/reset/${user_id}`;

    await sendEmail(
      email,
      user.name as string,
      user.image as string,
      url,
      "Reset your password - shokouhSkr",
      resetTemplateEmail
    );

    return new NextResponse("An email has been sent to you, use it to reset your password.", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
};
