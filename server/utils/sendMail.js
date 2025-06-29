const nodemailer = require("nodemailer");
const notifyOwnerOfWaitlist = require("./templates/notifyOwnerOfWaitlist");
const generateReplyToInvestor = require("./templates/replyToInvestor");
require("dotenv").config();

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000, // 10 seconds
  socketTimeout: 10000, // 10 seconds
});

const sendFormSubmissionEmail = async (submission) => {
  const { name, email, mobile, message,date } = submission;
  if (!name || !email || !mobile) {
    return {
      success: false,
      error: "Missing required fields: name, email, mobile",
    };
  }
  const notifyOwnerOfWaitlistOptions = {
    from: `"Jewllery" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `📩 New User Joined the Waitlist: ${name}`,
    html: notifyOwnerOfWaitlist({ name, email, mobile, message,date }),
    text: `New Contact Submission\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${
      message || "N/A"
    }\nSubmitted at: ${date}`,
  };
  const replyInvestorMailOptions = {
    from: `"Jewllery Team" <${process.env.EMAIL_USER}>`,
    to: email,
    cc: process.env.EMAIL_CC, // optional CC email(s) — comma-separated if multiple
    bcc: process.env.EMAIL_BCC, // optional BCC email(s)
    subject: `Welcome to Jewllery! Your Yachting Investment Journey Starts Now 🛥️`,
    html: generateReplyToInvestor({ name }),
  };

  try {
    await transporter.sendMail(notifyOwnerOfWaitlistOptions);
    await transporter.sendMail(replyInvestorMailOptions);

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error };
  }
};

module.exports = {
  sendFormSubmissionEmail,
};
