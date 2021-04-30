const mongoose = require('mongoose');

const ChassisSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  couleur: {
    type: String,
    enum: ['blanc', 'masse', 'film1', 'film2'],
    required: true
  },
  ouverture: {
    type: String,
    enum: ['OF', 'OB',],
    required: true
  },
  vantaux: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true
  },
  bequilleDouble: {
    type: Boolean,
    required: true
  },
  sousbassement: {
    type: Boolean,
    required: true
  },
  largeurMin: {
    type: Number,
    required: true
  },
  hauteurMin: {
    type: Number,
    required: true
  },
  largeurMax: {
    type: Number,
    required: true
  },
  hauteurMax: {
    type: Number,
    required: true
  },
  epaisseurL: {
    type: Number,
    required: true
  },
  epaisseurH: {
    type: Number,
    required: true
  },
  tarifs: {
    type: [{
      largeur: Number,
      hauteur: Number,
      tarif: Number
    }],
    required: true
  }
});
ChassisSchema.index({ ouverture: 1, couleur: 1, vantaux: 1 }, { unique: true })
module.exports = Chassis = mongoose.model('chassis', ChassisSchema, 'chassis');