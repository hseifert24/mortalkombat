/* eslint-disable no-console */
import React from 'react';

class WeaponCreator extends React.Component {

  constructor(props) {
    super(props);
    this.addWeapon = this.addWeapon.bind(this);
  }

  addWeapon() {
    console.log('Called addWeapon');
    console.log('refs:', this.refs);
    const name = this.refs.WeaponName.value;
    const attack = this.refs.WeaponAttack.value;
    const image = this.refs.WeaponImage.value;
    const body = JSON.stringify({ name, attack, image });

    fetch('//localhost:3333/weapons', { method: 'post', body, headers: { 'Content-Type': 'application/json' } })
    .then(() => {
      this.refs.WeaponName.value = '';
      this.refs.WeaponAttack.value = '';
      this.refs.WeaponImage.value = '';
    });
  }
  render() {
    return (
      <div>
        <h2> Create a Weapon </h2>
        <div>
          <label>Name:</label>
          <input ref="WeaponName" type="text" />
        </div>
        <div>
          <label>Attack:</label>
          <input ref="WeaponAttack" type="text" />
        </div>
        <div>
          <label>Image:</label>
          <input ref="WeaponImage" type="text" />
        </div>
        <button onClick={this.addWeapon}>Create</button>
      </div>
    );
  }
}
export default WeaponCreator;
