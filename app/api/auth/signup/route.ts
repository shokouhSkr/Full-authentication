import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { first_name, last_name, phone, password, email } = body;

    const existingEmailUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingEmailUser) {
      return new NextResponse(
        JSON.stringify({ message: "This email address already exists!", status: 401 })
      );
    }

    const existingPhoneUser = await prisma.user.findUnique({
      where: {
        phone: phone,
      },
    });
    if (existingPhoneUser) {
      return new NextResponse(
        JSON.stringify({ message: "This phone number already exists!", status: 401 })
      );
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name: `${first_name} ${last_name}`, phone, email, password: cryptedPassword },
    });

    return new NextResponse(
      JSON.stringify({
        user,
        message: "Register success! Please activate your account to start",
        status: 200,
      })
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: (error as Error).message, status: 500 }));
  }
};
