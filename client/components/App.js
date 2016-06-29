import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Mortal Kombat Game</a>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/addWeapon">Create a Weapon</Link></li>
              <li><Link to="/addCreature">Create a Creature</Link></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
