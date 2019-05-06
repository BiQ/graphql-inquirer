import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Inquirer from '../application.jsx';

const fetchFunc = (query) => {
  
  let req_opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  };
  
  //let req_url = 'https://1jzxrj179.lp.gql.zone/graphql';
  let req_url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
  
  return fetch(req_url, req_opts).then((response) => (response.json()));

};

// An example using the router within the Inquirer
const App = <Inquirer fetcher={fetchFunc} />;

// An example of putting Inquirer inside an existing router
const RoutedApp = (
  <HashRouter>
    <Route path="/stuff/" component={() =>
      <Inquirer fetcher={fetchFunc} isInARouter />
    } />
  </HashRouter>
);

window.onload = function(){
  ReactDOM.render(RoutedApp, document.getElementById('stage'));
};
