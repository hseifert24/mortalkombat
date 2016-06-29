/* eslint-disable new-cap, no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import express from 'express';
import Creature from '../models/creature';
const router = module.exports = express.Router();

// get all creatures
router.get('/', (req, res) => {
  console.log('Calling Creature GET');
  Creature.find((err, creatures) => res.send({ creatures }));
});
// get a creature
router.get('/:id', (req, res) => {
  console.log('Calling single creature GET');
  Creature.findById(req.params.id, (err, creature) => {
    res.send({ creature });
  });
});
// save a creature
router.post('/', (req, res) => {
  console.log('Calling Creature POST (new), body:', (JSON.stringify(req.body)));
  const creature = new Creature(req.body);
  creature.save(() => {
    res.send({ creature });
  });
});
// update a creature
router.put('/:id/', (req, res) => {
  console.log('Calling Creature PUT (wins/losses)');
  const isWin = req.body.didWin;
  Creature.findById(req.params.id, (err, creature) => {
        // not sure if isWin is a boolean here
    if (isWin) {
      creature.wins++;
    } else {
      creature.losses++;
    }
    creature.save(() => {
      res.send({ creature }); // this should the updated creature
    });
  });
});
