const nodemailer = require("nodemailer");

async function sendTestEmail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "customskairos@gmail.com",
      pass: "gzkf aogw zuej tnsh"
    }
  });

  let mailOptions = {
    from: "customskairos@gmail.com",
    to: "customskairos@gmail.com",
    subject: "Test Email from Kairos Customs",
    html: "<h2>This is a test email from Kairos Customs</h2>"
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Test email sent:", info.response);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
}

sendTestEmail();

