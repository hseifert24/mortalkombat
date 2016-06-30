/* eslint-disable no-console */
import React from 'react';

class ShowCombatant extends React.Component {
  constructor(props) {
    super(props);
    let creature = props.creature;
    if (!creature) {
      creature = { name: '', health: 0, image: '' };
    }
    let weapon = props.weapon;
    if (!weapon) {
      weapon = { name: '', image: '' };
    }
    this.state = { creature, weapon };
  }

  componentWillReceiveProps(nextProps) {
    console.log('In componentWillReceiveProps', nextProps);
    let creature = nextProps.creature;
    if (!creature) {
      creature = { name: '', health: 0, image: '' };
    }
    let weapon = nextProps.weapon;
    if (!weapon) {
      weapon = { name: '', image: '' };
    }
    this.setState({ creature, weapon });
  }

  render() {
    return (
      <div className="combatant">
        <h3>Combantant</h3>
        <div>
          <label>Health Bar:</label>
          <span>{this.state.creature.health}</span>
        </div>
        <div className="creature">
          <div>
            <label>Creature Name:</label>
            <span>{this.state.creature.name}</span>
          </div>
          <div>
            <img className="creatureImage" src={this.state.creature.image} alt="" />
          </div>
        </div>
        <div className="weapon">
          <div>
            <label>Weapon Name :</label>
            <span>{this.state.weapon.name}</span>
          </div>
          <div>
            <img className="weaponImage" src={this.state.weapon.image} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
export default ShowCombatant;
