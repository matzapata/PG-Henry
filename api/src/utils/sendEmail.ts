import * as nodemailer from "nodemailer";
import "dotenv/config";

export default async function (
  email: string,
  subject: string,
  text: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  });
}
