require('dotenv').config();
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `"StudyNotion | CodeHelp - by Babbar" <${process.env.HOST_EMAIL}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.log("Error sending email:", error.message);
    }
};

module.exports = mailSender;
