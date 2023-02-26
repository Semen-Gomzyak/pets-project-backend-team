const sendGrid = require('@sendgrid/mail');

const { SENDGRID_KEY } = process.env;

sendGrid.setApiKey(SENDGRID_KEY);

const sendEmail = async data => {
  try {
    const email = {
      ...data,
      from: 'ruslan.shyrogorov@icloud.com',
    };

    await sendGrid.send(email);
    return true;
  } catch (error) {
    console.log('sendGrid error', error);
  }
};

module.exports = sendEmail;
