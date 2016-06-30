/* eslint-disable no-console */
import React from 'react';
import SelectCombatant from './SelectCombatant';
import ShowCombatant from './ShowCombatant';

class Game extends React.Component {
  constructor(props) {
    super(props);
    // we could use figheter/weapon arrays, but I'm tired...
    this.state = { creature1: undefined, weapon1: undefined, creature2: undefined, weapon2: undefined };
    this.selectedFighter1 = this.selectedFighter1.bind(this);
    this.selectedFighter2 = this.selectedFighter2.bind(this);
    this.fight = this.fight.bind(this);
    this.fightRound = this.fightRound.bind(this);
  }
  selectedFighter1(creature1, weapon1) {
    // rather than having the child pass it back, we could just pull it back from the xrefs
    console.log('in Game.selectedFighter1.  creature1:', creature1, 'weapon1:', weapon1);
    this.setState({ creature1, weapon1 });
  }
  selectedFighter2(creature2, weapon2) {
    // rather than having the child pass it back, we could just pull it back from the xrefs
    console.log('in Game.selectedFighter2.  creature2:', creature2, 'weapon2:', weapon2);
    this.setState({ creature2, weapon2 });
  }
  fightRound() {
    console.log('in Fight Round');
  ]
  fight(event) {
    console.log('in Fight:', event);
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
