import nodemailer from 'nodemailer';
import { config } from '../config/config';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        if (!config.email.user || !config.email.password) {
            throw new Error('Email credentials are not configured. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file');
        }

        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.email.user,
                pass: config.email.password
            }
        });
    }

    async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
        const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;
        
        const mailOptions = {
            from: config.email.user,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <h1>Password Reset Request</h1>
                <p>You requested a password reset for your Emergency Planner account.</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            if (error.code === 'EAUTH') {
                throw new Error('Email authentication failed. Please check your email credentials in the .env file');
            }
            throw new Error('Failed to send password reset email');
        }
    }
}

export const emailService = new EmailService(); 