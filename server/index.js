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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    logger: true,
    debug: true
  });
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: "customskairos@gmail.com",
    subject: "New Custom Order Request",
    html: `<h2>New Request from ${name}</h2>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    res.json({ success: true, message: "Request submitted successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.get("/api/design/:id", (req, res) => {
  const designId = req.params.id;
  const designData = {
    id: designId,
    name: "Custom Design",
    description: "Design mockup for a valued client.",
    imageUrl: "/sample_dsn.png"
  };
  res.json(designData);
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint working" });
});

app.get("/", (req, res) => {
  res.redirect("/design/123?clientName=Alice+Smith&price=$10&imageUrl=/AS_DESIGN.png");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

