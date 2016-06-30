/* eslint-disable no-console */
import React from 'react';

class SelectCombatant extends React.Component {

  constructor(props) {
    super(props);
    this.cb = props.cb;
    this.state = { errorMsg: '', weapons: [], creatures: [] };
    this.makeSelection = this.makeSelection.bind(this);
    this.displayError = this.displayError.bind(this);
    this.clearError = this.clearError.bind(this);
    this.getWeapons = this.getWeapons.bind(this);
    this.getCreatures = this.getCreatures.bind(this);
  }
  // get the weapons and creatures once
  componentDidMount() {
    this.getWeapons();
    this.getCreatures();
  }
  // this is triggered by the click of the select button
  makeSelection() {
    console.log('Called selectedCreature');
    const creatureID = this.refs.CreatureList.value;
    if (!creatureID) {
      return this.displayError('Please select a Creature');
    }
    const weaponID = this.refs.WeaponList.value;
    if (!weaponID) {
      return this.displayError('Please select a Weapon');
    }
    // this.cb(creature, weapon);
    console.log('Selected Creature:', creatureID, 'Weapon:', weaponID);
    const creature = this.state.creatures.filter(c => c._id === creatureID);
    const weapon = this.state.weapons.filter(c => c._id === weaponID);
    this.props.cb(creature[0], weapon[0]);
  }
  // pull the weapons from the db
  getWeapons() {
    fetch('//localhost:3333/weapons')
    .then(r => r.json())
    .then(result => {
      this.setState({ weapons: result.weapons });
    });
  }
  // pull the creatures from the db
  getCreatures() {
    fetch('//localhost:3333/creatures')
    .then(r => r.json())
    .then(result => {
      this.setState({ creatures: result.creatures });
    });
  }
  // display an error message
  displayError(errorMsg) {
    console.log('error:', errorMsg);
    this.state.errorMsg = errorMsg;
    this.setState({ errorMsg });
  }
  // clear the error message
  clearError() {
    this.displayError('');
  }
  // render the conents of this widget
  render() {
    return (
      <div>
        <div className="ErrorMsg" ref="ErrorMsg">{this.state.errorMsg}</div>
        <div className="selectCreature" >
          <label>Creature:</label>
          <select ref="CreatureList" className="selectCreature" onClick={this.clearError}>
            <option />
              {this.state.creatures.map((c, i) => <option value={c._id} key={i}>{c.name}</option>)}
          </select>
        </div>
        <div className="selectWeapon" >
          <label>Weapon:</label>
          <select ref="WeaponList" className="selectWeapon" onClick={this.clearError}>
            <option />
              {this.state.weapons.map((w, i) => <option value={w._id} key={i}>{w.name}</option>)}
          </select>
        </div>
        <button onClick={this.makeSelection}>Select</button>
      </div>
    );
  }
}
export default SelectCombatant;
