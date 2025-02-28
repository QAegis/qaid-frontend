import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    // Generate a random token
    const token = crypto.randomBytes(20).toString('hex');

    // Store the token (in a real app, save it to DB with expiration)
    const verificationLink = `http://localhost:3000/register?token=${token}`;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'your-email@gmail.com', pass: 'your-email-password' },
        });

        await transporter.sendMail({
            from: 'no-reply@yourapp.com',
            to: email,
            subject: 'Complete Your Registration',
            html: `
                <p>Click the button below to start your registration:</p>
                <a href="${verificationLink}" 
                    style="display:inline-block; padding:10px 20px; background:#2D767F; color:white; text-decoration:none; border-radius:5px;">
                    Start Freemium
                </a>
            `,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
}
