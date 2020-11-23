import fetch from 'isomorphic-fetch';

import { getIntrospectionQuery } from 'graphql';

const introspectionQuery = getIntrospectionQuery();

const fetchSchema = (req_url) => {

  let req_opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: introspectionQuery }),
  };

  return fetch(req_url, req_opts)
          .then((response) => {
            if (response.ok) return response.json();
            throw new Error(response.status);
          }).then((result) => {
            return result;
          }).catch((error) => {
            return { error: error };
          });
};

const getSchemaFromUrl = (url) => {

  return fetch(url).then((response) => {
    if (response.ok) return response.json();
    throw new Error(response.status);
  }).then((result) => {
    return result;
  }).catch((error) => {
    return { error: error };
  });

};

const executeOperation = (fetcher, operation) => {
  if (fetcher && typeof fetcher === 'function') {
    return fetcher(operation)
            .then((result) => {
              if (!result || typeof result !== 'object')
                throw new Error('Result not of type \'object\'');

              const { data } = result;

              if (!data || typeof data !== 'object')
                throw new Error('Result did not have property data of type \'object\'', result);

              return result;
            });
  } else throw new Error('Failed to execute operation', operation);
};

const getSchemaWithFetcher = (fetcher) => {
  if (fetcher && typeof fetcher === 'function') {
    return fetcher({ query: introspectionQuery })
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
};

const transformSchema = (schema) => {

  const {
    queryType,
    mutationType,
    subscriptionType,
    types,
    //directives
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

export {
  fetchSchema,
  getSchemaFromUrl,
  getSchemaWithFetcher,
  transformSchema,
  executeOperation
};
