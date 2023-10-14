import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

type UserToken = {
  id: string;
};

const { RESET_TOKEN_SECRET } = process.env;

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { token, password } = body;

    const userToken = jwt.verify(token, RESET_TOKEN_SECRET!) as UserToken;

    const user = await prisma.user.findUnique({
      where: { id: userToken?.id.toString() },
    });

    if (!user) {
      return new NextResponse("This account no longer exist.", { status: 400 });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user?.id },
      data: { password: cryptedPassword },
    });
    return new NextResponse("Your account password has been successfully updated.", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
};
