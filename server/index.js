require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/send-email", upload.array("images"), async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER || "customskairos@gmail.com",
            pass: process.env.EMAIL_PASS || "gzkf aogw zuej tnsh",
        },
    });

    let attachments = req.files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
    }));

    let mailOptions = {
        from: "customskairos@gmail.com",
        to: "customskairos@gmail.com",
        subject: "New Custom Order Request",
        html: `
            <h2>New Request from ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `,
        attachments: attachments,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Request submitted successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

// Serve static assets from the React build in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    // For any route not handled, send back React's index.html file.
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

