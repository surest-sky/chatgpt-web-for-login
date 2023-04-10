import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';

const transporter: Mail = nodemailer.createTransport({
    port: process.env.MAIL_PORT,
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    secure: process.env.MAIL_SECURE,
});

transporter.verify((error) => {
    if (error) {
        throw new Error('error with email connection');
    }
});

export const sendLoginVerifyCode = async (email: String, code: Number) => {
    const message = {
        from: `chatGpt <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: 'chatGpt Web Login Verify Code',
        html: '您的验证码: ' + code + '，请在5分钟内输入。',
    };

    await transporter.sendMail(message).then(console.log).catch((error: Error) => {
        throw new Error(error.message)
    });
};