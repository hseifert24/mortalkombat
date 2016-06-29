/* eslint-disable func-names */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const weaponSchema = new Schema({
  name: { type: String, required: true },
  attack: { type: Number, default: 0 },
  image: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weapon', weaponSchema);
