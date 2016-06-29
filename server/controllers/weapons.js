/* eslint-disable new-cap, no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import express from 'express';
import Weapon from '../models/weapon';
const router = module.exports = express.Router();

// get all weapons
router.get('/', (req, res) => {
  console.log('Calling weapons GET');
  Weapon.find((err, weapons) => res.send({ weapons }));
});

// get a weapon
router.get('/:id', (req, res) => {
  console.log('Calling single weapons GET');
  Weapon.findById(req.params.id, (err, weapon) => {
    res.send({ weapon });
  });
});

// save a weapon
router.post('/', (req, res) => {
  console.log('Calling Weapons POST (new), body:', (JSON.stringify(req.body)));
  const weapon = new Weapon(req.body);
  weapon.save(() => {
    res.send({ weapon });
  });
});
