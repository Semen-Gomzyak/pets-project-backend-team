const { HttpError } = require('../../middlwares');
const { Pet } = require('../../models');
const { petValidation } = require('../../validation');
const uploudCloudinaryImg = require("../../helpers/uploadPetImgCloudinary")

const addPet = async (req, res) => {
  const { error } = petValidation.validate(req.body);
  if (error) {
    throw HttpError(400, 'Bad request body');
  }
  
  const { _id: owner } = req.user;
  const petUrl = uploudCloudinaryImg(req)

  const result = await Pet.create({ ...req.body, owner, avatarURL:petUrl});

  res.status(201).json(result);
};

module.exports = addPet;
