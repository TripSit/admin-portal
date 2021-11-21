import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home';
import LoginPage from './pages/login';
import LogoutPage from './pages/logout';

import DrugListingPage from './pages/drugs';
import CreateDrugPage from './pages/drugs/create';
import UpdateDrugPage from './pages/drugs/details';

import UserListingPage from './pages/users';
import CreateUserPage from './pages/users/create';
import UserDetailsPage from './pages/users/details';

import NotFoundPage from './pages/not-found';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/logout" component={LogoutPage} />

      <Route exact path="/drugs" component={DrugListingPage} />
      <Route exact path="/drugs/create" component={CreateDrugPage} />
      <Route exact path="/drugs/:drugId" component={UpdateDrugPage} />

      <Route exact path="/users" component={UserListingPage} />
      <Route exact path="/users/create" component={CreateUserPage} />
      <Route exact path="/users/:userId" component={UserDetailsPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes;
