import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Using Gmail service directly
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD  // This should be an App Password, not your regular Gmail password
    }
});

// Verify transporter connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log('Email configuration error. Make sure you have:');
        console.log('1. Set up 2-Step Verification in your Google Account');
        console.log('2. Generated an App Password for this application');
        console.log('3. Used the App Password in your .env file');
        console.log('Error details:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

export const sendEmail = async (to, subject, text, html) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            throw new Error('Email configuration is missing in .env file');
        }

        const mailOptions = {
            from: `"CarHub Contact" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}; 