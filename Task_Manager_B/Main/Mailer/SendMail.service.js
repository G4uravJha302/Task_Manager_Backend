import nodemailder from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function Sendmail(mess, to) {
  const mailer = nodemailder.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
    user: "akhilendrajha03@gmail.com",
    pass: "vryf hady pkcx qmic",
  },

  });

  const payload = {
    from: 'akhilendrajha03@gmail.com',
    to: to,
    subject: "Hello! please verify your email, keep it secret and safe, do not share with anyone",
    text: mess,
  }

  const mail = await mailer.sendMail(payload)
  console.log('success', mail);
}
