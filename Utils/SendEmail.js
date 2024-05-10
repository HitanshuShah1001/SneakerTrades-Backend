const nodeMailer = require("nodemailer");
const GMAIL = "gmail";
const FROM_EMAIL = "sneakertrades69@gmail.com";
const AUTH_PASS = "efcy dnhy slvr vegz";
const sendEmail = async ({ Email, otp }) => {
  const transporter = nodeMailer.createTransport({
    service: GMAIL,
    secure: true, // Use SSL
    auth: {
      user: FROM_EMAIL,
      pass: AUTH_PASS,
    },
  });

  const mailOptions = {
    from: FROM_EMAIL,
    to: Email,
    subject: "OTP for verification",
    text: `Here is the OTP for verification ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
