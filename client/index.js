import App from './components/App';
import WeaponCreator from './components/WeaponCreator';
import CreatureCreator from './components/CreatureCreator';
import Home from './components/Home';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
require('es6-promise').polyfill();
require('isomorphic-fetch');

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="addWeapon" component={WeaponCreator} />
      <Route path="addCreature" component={CreatureCreator} />
    </Route>
  </Router>
  , document.getElementById('root'));
