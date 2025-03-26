import {Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config"
import emailjs from '@emailjs/browser';


export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
})


export const sendEmail = async ({ email, subject, message}: {email: string, subject: string, message: string}) => {
    try {
      await emailjs.send("service_pie7pbg","template_kwdrdds",{
      email: email,
      subject: subject,
      message: message,
      }, {
        publicKey: 'YOUR_PUBLIC_KEY',
      });
    }
    catch(error){
      console.error(error, "Email error");
      throw error;
    }
};


