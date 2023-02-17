const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');
const tempDir = path.join(__dirname, '../', 'tmp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 8192,
  },
});

const upload = multer({
  storage,
});

const avatarResize = async fileName => {
  const avatar = await Jimp.read(`${tempDir}/${fileName}`);
  avatar.resize(233, 233);

  return avatar;
};


module.exports = {
  upload,
  avatarResize,
};


