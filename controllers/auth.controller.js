const { User } = require('../models');
const { sendMail } = require('../middlwares');


const gravatar = require('gravatar');
const { Conflict, Unauthorized, NotFound } = require('http-errors');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');


const { SECRET } = process.env;


// ====== REGISTER USER =======

async function register(req, res, next) {
  const { email, password, name, cityRegion, mobilePhone, birthday } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const verificationToken = v4();

    const savedUser = await User.create({
      email,
      password: hashedPassword,
      name,
      cityRegion, 
      mobilePhone, 
      birthday,
      avatarURL: gravatar.url(email),
      verificationToken,
      verified: false,
    });

    await sendMail({
      to: email,
      subject: 'Please confirm you email',

      // Треба уточнити яке посилання ставити??:
      html: `<a href="localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
    });

    res.status(201).json({
      user: {
        name,
        email,
        birthday,
        mobilePhone, 
        cityRegion, 
        id: savedUser._id,
        avatarURL: savedUser.avatarURL,
      },
    });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error')) {
      throw Conflict('email in use(409)');
    }
  }
}


// ====== LOGIN USER =======

async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    throw new Unauthorized('email is wrong(401)');
  }

  if (!storedUser.verify) {
    throw new Unauthorized('email is not verified! Please check you mail box (401)');
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new Unauthorized('password is wrong (401)');
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, SECRET, { expiresIn: '4h' });

  await User.findByIdAndUpdate(storedUser._id, { token });

  return res.status(200).json({
    user: {
      token: token,
      id: storedUser._id,
    },
  });
}

// ====== LOGOUT USER =======

async function logout(req, res, next) {
  const storedUser = req.user;

  await User.findByIdAndUpdate(storedUser._id, { token: '' });

  return res.status(204).end();
}


// ====== GET CURRENT USER (ME) =======

async function getCurrentUser(req, res, next) {
  const { user } = req;
  const { name, email, _id: id, cityRegion,  birthday, mobilePhone, } = user;

  return res.status(200).json({
    date: {
      user: {
        name,
        email,
        birthday,
        mobilePhone,
        cityRegion,
        id,
      },
    },
  });
}

// ====== UPDATE AVATAR USER  =======

async function updateAvatar(req, res, next) {
  const { id } = req.user;
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, '../tpm', filename);
  const publicPath = path.resolve(__dirname, '../public/avatars', filename);

  await Jimp.read(tmpPath)
    .then((image) => {
      return image.resize(233, 233).write(tmpPath);
    })
    .catch((error) => {
      console.error(error);
    });

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    return error;
  }

  const upUser = await User.findByIdAndUpdate(
    id,
    {
      avatarURL: `/public/avatars/${filename}`,
    },
    {
      new: true,
    }
  );
  console.log('upUser', upUser);
}

// ====== UPDATE ALL DATA OF USER  =======

async function updateAllData(req, res, next) {
  const { id } = req.user;
  console.log('id', id);

  const { name, email, cityRegion, mobilePhone, birthday } = req.body;
  console.log('data: ', name, email, cityRegion, mobilePhone, birthday );

  const upUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(upUser);
}


// ====== VERIFICATION EMAIL USER =======


async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await User.findOne({
    verificationToken: verificationToken,
  });

  if (!user) {
    throw NotFound('Verify token is not valid! User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.status(200).json({
    message: 'Verification successful',
  });
}


// ====== REPEAT VERIFICATION EMAIL USER =======


async function repeatVerifyEmail(req, res, next) {
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
}



module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  updateAllData,
  verifyEmail,
  repeatVerifyEmail,

};
