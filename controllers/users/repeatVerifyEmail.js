const { User } = require('../../models');
const { sendMail } = require('../../middlwares');

const repeatVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: 'Missing required field email',
    });
  }

  try {
    const storedUser = await User.findOne({
      email,
    });

    if (!storedUser) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const verificationToken = storedUser.verificationToken;

    if (!verificationToken) {
      return res.status(400).json({
        message: 'Verification has already been passed',
      });
    }

    await sendMail({
      to: email,
      subject: 'Please confirm your email',

      // Треба уточнити яке посилання ставити??:
      html: `<a href="localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
    });

    res.status(201).json({
      user: {
        email,
        subscription: storedUser.subscription,
        id: storedUser._id,
        avatarURL: storedUser.avatarURL,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = repeatVerifyEmail;
