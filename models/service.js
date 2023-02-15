const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;