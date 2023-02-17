const Jimp = require("jimp");

const resizeImg = async (image, width, height) => {
  try {
    const resizeImg = await Jimp.read(image);
    resizeImg.resize(width, height);
    resizeImg.write(image);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = resizeImg;
