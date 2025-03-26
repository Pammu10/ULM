import { SMTPClient } from '@emailjs/nodejs';
import config from "@/lib/config";
import { NextResponse } from 'next/server';

const emailClient = new SMTPClient({
    user: config.env.emailJS.user,
    password: config.env.emailJS.password,
    host: 'smtp.gmail.com',
    ssl: true,
});

export async function POST(request: Request) {
    try {
        const { to, subject, text, from } = await request.json();
        
        await emailClient.send({
            from,
            to,
            subject,
            text,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to send email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}