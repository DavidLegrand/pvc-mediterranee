const mongoose = require('mongoose');

const VitrageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  option: {
    type: String,
    enum: ['depoli', 'granite', 'delta', null],
    required: true,
    default: null
  },
  tarifM2: {
    type: Number,
    required: true
  },
  surfaceMin: {
    type: Number,
    required: true
  },
  rapport1: {
    type: Number,
    required: true
  },
  coef1: {
    type: Number,
    required: true
  },
  rapport2: {
    type: Number,
    required: true
  },
  coef2: {
    type: Number,
    required: true
  },
});

module.exports = Vitrage = mongoose.model('vitrages', VitrageSchema);