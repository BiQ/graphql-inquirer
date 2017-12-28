import React from 'react';
import ReactDOM from 'react-dom';

import fetch from 'isomorphic-fetch';

import * as GraphQL from 'graphql';

const GinqExample = (props) => {

  return (
    <div>
      <h1>EXAMPLE APP</h1>
      <pre>
        {props.body}
      </pre>
    </div>
  );

};

window.onload = () => {
  let elm = document.querySelector('#stage');

  let req_url = 'https://1jzxrj179.lp.gql.zone/graphql';

  let req_opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GraphQL.introspectionQuery }),
  };

  let res_data = "loading...";

  fetch(req_url, req_opts)
    .then((response) => {
      console.log('response', response);
      if (response.ok) return response.json();
      throw new Error(response.status);
    }).then((result) => {
      console.log('got results', result);
      res_data = JSON.stringify(result, null, '  ');
    }).catch((error) => {
      console.log('got an error', error);
      res_data = "oh noes.. an error";
    }).finally(() => {
      console.log('Finally!');
      ReactDOM.render(<GinqExample body={res_data} />, elm);
    });

};

// ----------
/*
fetch('https://1jzxrj179.lp.gql.zone/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ posts { title } }' }),
})
*/