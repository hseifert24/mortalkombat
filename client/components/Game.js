/* eslint-disable no-console */
import React from 'react';
import SelectCombatant from './SelectCombatant';
import ShowCombatant from './ShowCombatant';

class Game extends React.Component {
  constructor(props) {
    super(props);
    // we could use figheter/weapon arrays, but I'm tired...
    this.state = { creature1: undefined, weapon1: undefined, creature2: undefined, weapon2: undefined, round: 0, lastAttacker: undefined };
    this.selectedFighter1 = this.selectedFighter1.bind(this);
    this.selectedFighter2 = this.selectedFighter2.bind(this);
    this.fight = this.fight.bind(this);
    this.fightRound = this.fightRound.bind(this);
    this.setFirstAttacker = this.setFirstAttacker.bind(this);
    this.updateWinner = this.updateWinner.bind(this);
    this.updateCreature = this.updateCreature.bind(this);
  }
  // componentWillUpdate() {
  //   this.setState({ round: this.state.round++ });
  // }
  selectedFighter1(creature1, weapon1) {
    // rather than having the child pass it back, we could just pull it back from the xrefs
    this.setState({ creature1, weapon1 });
  }
  selectedFighter2(creature2, weapon2) {
    // rather than having the child pass it back, we could just pull it back from the xrefs
    this.setState({ creature2, weapon2 });
  }
  fightRound() {
    let damage = 0;
    let gameOver = false;
    console.log('Round ', this.state.round, 'lastAttacker: ', this.state.lastAttacker);
    if (this.state.lastAttacker === 'creature2') {
      // creature 1 atacks
      damage = Math.round(Math.random() * this.state.weapon1.attack, 0);
      console.log('Creature 1 hits for ', damage, 'damage');
      this.state.creature2.health = this.state.creature2.health - damage;
      this.setState({ creature2: this.state.creature2, lastAttacker: 'creature1' });
    } else {
      // creature 2 attacks
      damage = Math.round(Math.random() * this.state.weapon2.attack, 0);

      console.log('Creature 2 hits for ', damage, 'damage');
      this.state.creature1.health = this.state.creature1.health - damage;
      this.setState({ creature1: this.state.creature1, lastAttacker: 'creature2' });
    }
    if (this.state.creature1.health <= 0) {
      this.updateWinner('creature2');
      gameOver = true;
    }
    if (this.state.creature2.health <= 0) {
      this.updateWinner('creature1');
      gameOver = true;
    }
    return gameOver;
  }
  updateWinner(creature) {
    if (creature === 'creature1') {
      this.state.creature1.wins = this.state.creature1.wins + 1;
      this.setState({ creature1: this.state.creature1 });
      this.updateCreature(this.state.creature1._id, JSON.stringify(this.state.creature1));
      this.state.creature2.losses = this.state.creature2.losses + 1;
      this.setState({ creature2: this.state.creature2 });
      this.updateCreature(this.state.creature2._id, JSON.stringify(this.state.creature2));
    } else {
      this.state.creature2.wins = this.state.creature2.wins + 1;
      this.setState({ creature2: this.state.creature2 });
      this.updateCreature(this.state.creature2._id, JSON.stringify(this.state.creature2));
      this.state.creature1.losses = this.state.creature1.losses + 1;
      this.setState({ creature1: this.state.creature1 });
      this.updateCreature(this.state.creature1._id, JSON.stringify(this.state.creature1));
    }
  }
  updateCreature(creatureID, body) {
    console.log('Update creatureID:', creatureID);
    fetch(`//localhost:3333/creatures/${creatureID}`, { method: 'put', body, headers: { 'Content-Type': 'application/json' } })
    .then(() => {
      console.log('winner updated');
    });
  }
  setFirstAttacker() {
    console.log('Setting default lastAttacker');
    let result = 'creature2';
    const c1Starts = Math.floor(Math.random() * 2) - 1;
    if (c1Starts) {
      result = ('creature1');
    }
    this.setState({ lastAttacker: result });
  }
  fight() {
    if (this.state.lastAttacker === undefined) {
      this.setFirstAttacker();
    }
    const timer = setInterval(() => {
      const newRound = this.state.round + 1;
      this.setState({ round: newRound });
      if (this.fightRound()) {
        console.log('GAME OVER');
        clearInterval(timer);
      }
    }, 500);
  }
  render() {
    return (
      <div>
        <div className="SelectCombatants">
          <div>
            <h2>Select Combatant 1 </h2>
            <SelectCombatant cb={this.selectedFighter1} />
          </div>
          <div>
            <h2>Select Combatant 2</h2>
            <SelectCombatant cb={this.selectedFighter2} />
          </div>
        </div>
        <div className="ShowCombatants">
          <ShowCombatant weapon={this.state.weapon1} creature={this.state.creature1} />
          <ShowCombatant weapon={this.state.weapon2} creature={this.state.creature2} />
        </div>
        <div className="gameControls">
          <button onClick={this.fight}>Fight!</button>
        </div>
      </div>
    );
  }
}
export default Game;
