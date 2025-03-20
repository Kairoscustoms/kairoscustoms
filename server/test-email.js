const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "customskairos@gmail.com",
        pass: "your-app-password-here",
    },
});

let mailOptions = {
    from: "customskairos@gmail.com",
    to: "customskairos@gmail.com",
    subject: "Test Email from Server",
    text: "If you receive this email, the server email setup is working!",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Email sent:", info.response);
    }
});

