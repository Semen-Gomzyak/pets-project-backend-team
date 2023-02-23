const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    birthdate: {
      type: Date,
      required: [false, 'valid format date : mm.dd.yyyy'],
    },
    breed: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    theSex: {
      type: String,
      enum: ['male', 'female'],
      required: false,
    },
    comments: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false, // for category "in good hands" and "'lost_found'" - no price
    },
    category: {
      type: String,
      enum: ['lost_found', 'in_good_hands', 'sell'],
      default: 'lost_found',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatarURL: {
      type: String,
      default: null,
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

const Notice = mongoose.model('notice', noticeSchema);

module.exports = Notice;
