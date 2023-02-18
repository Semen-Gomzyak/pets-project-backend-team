// const jwt = require('jsonwebtoken');
// const { User } = require('../../models/');

// const { SECRET } = process.env;
// const google = async (req, res) => {
//   const { _id: id } = req.user;
//   const payload = {
//     id,
//   };

//   const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
//   await User.findByIdAndUpdate(id, { token });

//   res.redirect(`http://localhost:3000?token=${token}`);
// };

// module.exports = google;
