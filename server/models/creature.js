/* eslint-disable func-names */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const creatureSchema = new Schema({
  name: { type: String, required: true },
  health: { type: Number, default: 100 },
  image: String,
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Creature', creatureSchema);
