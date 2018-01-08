import React from 'react';
import ReactDOM from 'react-dom';

import Inquirer from '../application.js';

const fetchFunc = (query) => {
  
  let req_opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  };
  
  let req_url = 'https://1jzxrj179.lp.gql.zone/graphql';
  //let req_url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
  
  return fetch(req_url, req_opts).then((response) => (response.json()));

};

window.onload = function(){
  ReactDOM.render(<Inquirer fetcher={fetchFunc} />, document.getElementById('stage'));
};
