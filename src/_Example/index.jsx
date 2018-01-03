import React from 'react';
import ReactDOM from 'react-dom';

import Inquirer from '../V2/app.jsx';

let fetchFunc = (query) => {
  
  let req_opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  };
  
  let req_url = 'https://1jzxrj179.lp.gql.zone/graphql';
  //let req_url = 'https://swapi.co/api/people/schema';
  
  return fetch(req_url, req_opts).then((response) => (response.json()));

};

window.onload = function(){
  ReactDOM.render(<Inquirer fetcher={fetchFunc} />, document.getElementById('stage'));
}
