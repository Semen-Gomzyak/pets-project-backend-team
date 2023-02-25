const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');
dotenv.config();

const { avatarResize } = require('./avatar');
const  removePngOrJpgFromString  = require('./removePngOrJpgFromString');
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const updateCloudinaryAvatar = async (req, res) => {
  const id = req.params.id;
  try {
    const { path: tempUpload, originalname } = req.file;
    avatarResize(originalname);
    const avatarName = `${id}_${originalname}`;

    const cloudinaryUpload = await cloudinary.uploader.upload(tempUpload, {
      public_id: removePngOrJpgFromString(avatarName),
    });
    const avatarURL = cloudinaryUpload.secure_url;
    console.log(cloudinaryUpload);
    return avatarURL;
  } catch (error) {
    return '';
  }
};

module.exports = updateCloudinaryAvatar;
