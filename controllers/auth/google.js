const jwt = require('jsonwebtoken');
const { User } = require('../../models/');

const { SECRET } = process.env;
const google = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(
    `https://pets-project-frontend.vercel.app/profile?token=${token}`,
  );
};

module.exports = google;
