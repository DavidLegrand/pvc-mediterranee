import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FormDevis from 'components/pages/FormDevis';
import NotFound from 'components/pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={FormDevis} />
        <Route path='/*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
