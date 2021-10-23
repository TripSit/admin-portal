import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import UserListingPage from './pages/users';
import CreateUserPage from './pages/users/create';
import UserDetailsPage from './pages/users/details';
import NotFoundPage from './pages/not-found';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/users" component={UserListingPage} />
      <Route exact path="/users/create" component={CreateUserPage} />
      <Route exact path="/users/:userId" component={UserDetailsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes;
