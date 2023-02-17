const cloudinary = require('cloudinary').v2;

const cropNameImg = require('../helpers/cropNameImg');
const resizeImg = require("../helpers/resizeImg")

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const uploudCloudinaryImg = async (req, res) => {
  const { _id: owner } = req.user;

  try {
    const { path: tempUpload, originalname } = req.file;
    resizeImg(originalname, 250, 250)
    const newNamePetImg = `${owner}_${originalname}`;

    const cloudinaryUpload = await cloudinary.uploader.upload(tempUpload, {
      public_id: cropNameImg(newNamePetImg),
    });

    const imgURL = cloudinaryUpload.secure_url;

    return imgURL;

  } catch (error) {
    return '';
  }
};


module.exports = uploudCloudinaryImg;
