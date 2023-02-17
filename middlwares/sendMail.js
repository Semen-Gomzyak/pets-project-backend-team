const nodemailer = require('nodemailer');
const { EMAIL_PASS, EMAIL_USER } = process.env;


async function sendMail({ to, html, subject }) {
  const email = {
    from: 'info@mycontacts.com',
    to,
    subject,
    html,
  };

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transport.sendMail(email);
};

module.exports = sendMail;

