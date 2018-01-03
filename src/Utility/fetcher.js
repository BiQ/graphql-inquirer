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

const getSchemaWithFetcher = (fetcher) => {
  if (fetcher && typeof fetcher === 'function') {
    return fetcher({ query: GraphQL.introspectionQuery })
            .then((result) => {
              if (!result || typeof result !== 'object') 
                throw new Error('Result not of type \'object\'');

              const { data } = result;

              if (!data || typeof data !== 'object') 
                throw new Error('Result did not have property data of type \'object\'');
              
              const { __schema } = data;

              if (!data || typeof data !== 'object') 
                throw new Error('Result.data did not have property __schema of type \'object\'');
                
              return { schema: __schema };

            }).catch((error) => {
              throw new Error('Failed to fetch schema from resource', error);
            });
  } else throw new Error('Fetcher was not a function');
}

const transformSchema = (schema) => {

  console.log('schema', schema);

  const {
    queryType,
    mutationType,
    subscriptionType,
    types,
    directives
  } = schema;

  let ts = { 
    types,
    queries: [],
    mutations: [],
    subscriptions: []
  };

  if (queryType && queryType.name) {
    let qt = types.find((obj) => (obj.name === queryType.name));
    ts.queries = qt.fields || [];
  }
  if (mutationType && mutationType.name) {
    let mt = types.find((obj) => (obj.name === mutationType.name));
    ts.mutations = mt.fields || [];
  }
  if (subscriptionType && subscriptionType.name) {
    let st = types.find((obj) => (obj.name === subscriptionType.name));
    ts.subscriptions = st.fields || [];
  }

  return ts;

};

module.exports = {
  fetchSchema,
  getSchemaFromUrl,
  getSchemaWithFetcher,
  transformSchema
};

