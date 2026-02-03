import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

/* SMTP transporter */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,          // 587 = TLS (recommended)
  secure: false,      // true only for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* Base email sender */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Event Booking" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error(' Email error:', error.message);
    throw error;
  }
};

/* Booking email*/
export const sendBookingEmail = async ({ to, name, eventTitle, date }) => {
  console.log(' Email Notification:', {
    to,
    subject: 'Event Booking Confirmation',
    message: `Hello ${name}, your booking for ${eventTitle} on ${date} is confirmed.`
  });

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2> Booking Confirmed</h2>
      <p>Hello <b>${name}</b>,</p>
      <p>
        Your booking for <b>${eventTitle}</b> on <b>${date}</b> has been
        <span style="color: green; font-weight: bold">confirmed</span>.
      </p>
      <p>Thank you for booking with us!</p>
      <hr />
      <small>Event Booking App</small>
    </div>
  `;

  return sendEmail({
    to,
    subject: 'Event Booking Confirmation',
    html,
  });
};

export default sendEmail;
