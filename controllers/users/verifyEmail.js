const { User } = require('../../models');
const { NotFound } = require('http-errors');
const { sendEmail } = require('../../middlwares/sendMail');

const { BASE_URL } = process.env;

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound(404, 'Not found');
  }

  if (user.verify) {
    throw NotFound(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<p>By clicking on the following link, you are confirming your email address.</p>\n
              <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Confirm email address</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: 'Verification email sent',
  });
  // ======================================
  // const { verificationToken } = req.params;
  // const user = await User.findOne({
  //   verificationToken: verificationToken,
  // });

  // if (!user) {
  //   throw NotFound('Verify token is not valid! User not found');
  // }

  // await User.findByIdAndUpdate(user._id, {
  //   verify: true,
  //   verificationToken: null,
  // });

  // return res.status(200).json({
  //   message: 'Verification successful',
  // });
};

module.exports = verifyEmail;
