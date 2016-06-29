/* eslint-disable no-console */
import React from 'react';

class CreatureCreator extends React.Component {

  constructor(props) {
    super(props);
    this.addCreature = this.addCreature.bind(this);
  }

  addCreature() {
    console.log('Called addWeapon');
    console.log('refs:', this.refs);
    const name = this.refs.CreatureName.value;
    const health = this.refs.CreatureHealth.value;
    const image = this.refs.CreatureImage.value;
    const body = JSON.stringify({ name, health, image });

    fetch('//localhost:3333/creatures', { method: 'post', body, headers: { 'Content-Type': 'application/json' } })
    .then(() => {
      this.refs.CreatureName.value = '';
      this.refs.CreatureHealth.value = '';
      this.refs.CreatureImage.value = '';
    });
  }
  render() {
    return (
      <div>
        <h2> Create a Creature </h2>
        <div>
          <label>Name:</label>
          <input ref="CreatureName" type="text" />
        </div>
        <div>
          <label>Health:</label>
          <input ref="CreatureHealth" type="text" />
        </div>
        <div>
          <label>Image:</label>
          <input ref="CreatureImage" type="text" />
        </div>
        <button onClick={this.addCreature}>Create</button>
      </div>
    );
  }
}
export default CreatureCreator;
