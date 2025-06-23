const nodemailer = require('nodemailer');

exports.sendContactForm = async (req, res) => {
  const {
    companyName,
    firstName,
    lastName,
    street,
    address2,
    city,
    state,
    zip,
    phone,
    email,
    message,
  } = req.body;

  if (!companyName || !phone || !email || !message) {
    return res.status(400).json({ error: 'Required fields are missing.' });
  }

  try {
   const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false otherwise
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });


    const mailOptions = {
      from: `"${companyName}" <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: 'New Contact Form Submission',
      text: `
Company Name: ${companyName}
Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}

Address:
${street}
${address2}
${city}, ${state}, ${zip}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};
