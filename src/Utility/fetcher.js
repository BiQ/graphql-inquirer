import fetch from 'isomorphic-fetch';

import * as GraphQL from 'graphql';

const fetchSchema = (req_url) => {

  let req_opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GraphQL.introspectionQuery }),
  };

  let res_data = {};

  return fetch(req_url, req_opts)
          .then((response) => {
            //console.log('response', response);
            if (response.ok) return response.json();
            throw new Error(response.status);
          }).then((result) => {
            //console.log('got results', result);
            return result;
          }).catch((error) => {
            //console.log('got an error', error);
            return { error: error };
          })/*.finally(() => {
            console.log('Finally!');
            return res_data;
            //ReactDOM.render(<GinqExample body={res_data} />, elm);
          });*/


};

const getSchemaFromUrl = (url) => {

  return fetch(url).then((response) => {
    if (response.ok) return response.json();
    throw new Error(response.status)
  }).then((result) => {
    return result;
  }).catch((error) => {
    return { error: error };
  });

};

module.exports = {
  fetchSchema,
  getSchemaFromUrl
};