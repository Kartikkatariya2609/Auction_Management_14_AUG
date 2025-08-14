import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };
  await transporter.sendMail(options);
};

import dotenv from "dotenv"
dotenv.config()

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "login",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const mailOptions = (htmlData, to, text, subject,attachments) => {
  return {
    from: process.env.EMAIL_USER,
    to: [to, process.env.EMAIL_USER],
    subject: subject,
    text: text,
    html: htmlData,
    attachments: attachments
  };
};

export const sendMailto = async (htmlData, to, text, subject,attachments) => {
  try {
    await transporter.sendMail(mailOptions(htmlData, to, text, subject,attachments));
    console.log("Mail Sent!");
  } catch (err) {
    console.log(err);
  }
};

// module.exports = sendMail;