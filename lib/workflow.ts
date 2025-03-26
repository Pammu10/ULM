import {Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config"
import { Client as QStashClient, resend } from "@upstash/qstash";


export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
})

const client = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ({ email, subject, message}: {email: string, subject: string, message: string}) => {
    await client.publishJSON({
  api: {
    name: "email",
    provider: resend({ token: config.env.resendToken }),
  },
  body: {
    from: "Pramodh <hello.pramodhthetechguy.site>",
    to: [email],
    subject: subject,
    html: message,
  },
});
}

