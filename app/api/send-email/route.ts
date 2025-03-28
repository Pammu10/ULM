import config from '@/lib/config';

import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const { to, subject, text, from } = await request.json();
        const data = {
            service_id: config.env.emailJS.serviceId,
            template_id: config.env.emailJS.templateId,
            user_id: config.env.emailJS.publicKey,
            template_params: {
                email: to,
                subject: subject,
                message: text,
            }
        };
        console.log(JSON.stringify(data));
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
        }
        return  NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}