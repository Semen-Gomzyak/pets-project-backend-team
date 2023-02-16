const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
   workDays: {
      type: Array,
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
    imageUrl: {
      type: String,
      default: null,
    },
     },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;