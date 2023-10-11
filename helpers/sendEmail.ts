import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

export default async function sendEmail(
  to: string,
  name: string,
  image: string,
  url: string,
  subject: string,
  template: string
) {
  const { MAILING_EMAIL, MAILING_PASSWORD, SMTP_HOST, SMTP_EMAIL, SMTP_PASSWORD, SMTP_PORT } =
    process.env;

  let transporter = nodemailer.createTransport({
    // port: Number(SMTP_PORT),
    // host: SMTP_HOST,
    // auth: {
    //   user: SMTP_EMAIL,
    //   pass: SMTP_PASSWORD,
    // },
    service: "gmail",
    auth: {
      user: MAILING_EMAIL,
      pass: MAILING_PASSWORD,
    },
  });

  // HTML REPLACEMENT IN EMAIL TEMPLATE
  const data = handlebars.compile(template);
  const replacements = {
    name: name,
    email_link: url,
    image: image,
  };
  const html = data(replacements);

  // VERIFY CONNECTION CONFIG
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("server is listening...");
        resolve(success);
      }
    });
  });

  // SEND EMAIL
  const options = {
    from: MAILING_EMAIL,
    to,
    subject,
    html,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}
