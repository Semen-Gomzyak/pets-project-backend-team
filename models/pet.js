const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    seks:{
        type: String,
        enum: ["male", "female"]
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Pet = mongoose.model('pet', petSchema);

module.exports = Pet;
