import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
 
    const { userId, action } = await request.json();

    try {
      const newStatus = action === 'APPROVED' ? 'APPROVED' : 'PENDING';
      await db.update(users).set({ status: newStatus }).where(eq(users.id, userId));
      return NextResponse.json({ status: newStatus }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
  }