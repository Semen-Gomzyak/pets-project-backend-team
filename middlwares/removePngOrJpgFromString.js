const dotenv = require('dotenv');
dotenv.config();

const removePngOrJpgFromString = string => {
  const words = string.split('.');
  words.pop();
  return words.join('.');
};

module.exports = removePngOrJpgFromString;
