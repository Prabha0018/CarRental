import express from 'express';
import { sendEmail } from '../config/emailService.js';

const router = express.Router();

router.post('/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create email content
        const htmlContent = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;

        const textContent = `
            New Contact Form Submission
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
        `;

        // Send email
        const result = await sendEmail(
            process.env.EMAIL_USER, // Send to your email
            `New Contact Form: ${subject}`,
            textContent,
            htmlContent
        );

        if (result.success) {
            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            res.status(500).json({ error: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Error in send-email route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 