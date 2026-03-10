/* ============================================
   FILE: mailRoute.js
   PURPOSE: Sends contact form emails via Gmail
   ENDPOINT: POST /api/mail/send-email
   REQUIRES: GMAIL_USER, GMAIL_PASS, MAIL_RECIPIENT in .env
   ============================================ */

require("dotenv").config();
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");


// -------------------- SEND EMAIL --------------------
// POST /api/mail/send-email
// Receives name, email, message from the contact form and sends an email
router.post("/send-email", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Set up the Gmail transporter (uses App Password, not real password)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
        });

        // Build the email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.MAIL_RECIPIENT,
            subject: `GetShitDone Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        // Send it
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ message: "Email sending failed" });
    }
});


module.exports = router;
