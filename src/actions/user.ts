"use server";

import { Prisma, User } from "@prisma/client";
import { db } from "~/server/db";
import { hash } from "bcrypt-ts";
import sendPWD from "./mail";

export async function CreateUser(user: Prisma.UserCreateInput): Promise<User> {
  const password = Math.random().toString(36).slice(-8);
  const hashedPassword = await hash(password, 10);
  const response = await db.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });
  await sendPWD(user.email, password);

  return response;
}
