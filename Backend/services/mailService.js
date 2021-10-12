const nodemailer = require("nodemailer");
const Email = require("email-templates");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

exports.sendEmail = async (mailOptions, locals = {}, template = "") => {
  const { to, from, replyTo } = mailOptions;
  if (template) {
    const email = new Email({
      message: {
        from,
        replyTo
      },
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
    });
    return await email.send({
      template,
      message: {
        to,
      },
      locals,
    });
  }
  return transporter.sendMail(mailOptions);
}
