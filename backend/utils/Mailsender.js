const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_NAME,
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASS,
      },
    });

    if (!transporter) {
      throw new Error("Failed to create transporter");
    }

    const info = await transporter.sendMail({
      from: "Coders Den",
      to: email,
      subject: title,
      html: body,
    });

    console.log(info);
    return info;

    console.log(`Email sent: ${info.messageId}`);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

module.exports=mailSender