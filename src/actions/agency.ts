"use server";
import type { Agency, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export async function createAgency(
  data: Prisma.AgencyCreateInput,
): Promise<Agency> {
  try {
    const response = await db.agency.create({ data });
    revalidatePath("/agencies");
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function DeleteAgency(id: string) {
  await db.user.updateMany({
    where: {
      agency_id: id,
    },
    data: {
      deleted: true,
    },
  });
  await db.agency.update({
    where: {
      id: id,
    },
    data: {
      deleted: true,
    },
  });
  revalidatePath("/agencies");
}
