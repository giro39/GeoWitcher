const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function sendVerificationEmail(to, token) {
    const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify?token=${token}`;
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: 'GeoWitcher - Verify your email',
        html: `
            <h1>Welcome to GeoWitcher!</h1>
            <p>Thank you for registering. Please verify your email address to complete the registration process.</p>
            <p>Click the link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>
            <p>If you did not register, please ignore this email.</p>
            <p>Best regards,<br>Jan - The GeoWitcher Team</p>
            `,
    });
}

async function sendPasswordResetEmail(to, token) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: 'GeoWitcher - Reset your password',
        html: `
            <h1>Password Reset Request</h1>
            <p>We received a request to reset your password. Click the link below to reset it:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>Jan - The GeoWitcher Team</p>
            `,
    });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };