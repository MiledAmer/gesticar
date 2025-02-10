"use server";
import type { Agency, Prisma } from "@prisma/client";
import { db } from "~/server/db";

export async function createAgency(
  data: Prisma.AgencyCreateInput,
): Promise<Agency> {
  try {
    return await db.agency.create({ data });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
