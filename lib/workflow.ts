import {Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config"
import { Client as QStashClient } from "@upstash/qstash";


export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
})

const client = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ({ email, subject, message}: {email: string, subject: string, message: string}) => {
    await client.publishJSON({
      url: `${config.env.prodApiEndpoint}/api/send-email`,
      body: {
          to: email,
          subject: subject,
          text: message,
          from: config.env.emailJS.fromEmail,
      },
  });
}

