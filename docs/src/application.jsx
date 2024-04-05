import React from 'react';
import ReactDOM from 'react-dom';

import GraphQLInquirer from 'graphql-inquirer';

const fetcher = (query) => {
  
  let req_url = 'https://1jzxrj179.lp.gql.zone/graphql';
  
  let req_opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  };
  
  return fetch(req_url, req_opts)
          .then((response) => (response.json()));
}

ReactDOM.render(<GraphQLInquirer fetcher={fetcher} />, document.getElementById('stage'));