import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';

import UserListingPage from './pages/users';
import CreateUserPage from './pages/users/create';
import UserDetailsPage from './pages/users/details';

import RolesPage from './pages/roles';
import CreateRolePage from './pages/roles/create';

import NotFoundPage from './pages/not-found';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path="/users" component={UserListingPage} />
      <Route exact path="/users/create" component={CreateUserPage} />
      <Route exact path="/users/:userId" component={UserDetailsPage} />

      <Route exact path="/roles" component={RolesPage} />
      <Route exact path="/roles/create" component={CreateRolePage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes;
