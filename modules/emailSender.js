const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
    try {
        // Create a nodemailer transporter (SMTP details)
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'your-email@example.com',
                pass: 'your-password'
            }
        });

        // Configure email options
        const mailOptions = {
            from: 'your-email@example.com',
            to,
            subject,
            text
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;