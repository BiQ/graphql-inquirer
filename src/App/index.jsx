import React from 'React';
import { graphql } from 'react-apollo';

import IntrospectionQuery from '../Queries/introspection.gql';
//import IntrospectionQuery from '../Queries/swapi_test.gql';

const App = (props) => {

  const {
    data
  } = props;

  const {
    loading,
    error, 
    __schema
  } = data;

  if (loading && !error) {
    return (<div>Loading...</div>);
  } else if (!!error) {
    return (<div>An error occured</div>)
  }

  console.log(__schema);

  const {
    queryType,
    mutationType,
    subscriptionType,
    types,
    directives
  } = __schema;

  return (
    <div>
      <h1>GraphQL magic</h1>
      <h2>Built-in types</h2>
      <h3>queryType</h3>
      <pre>
        {JSON.stringify(queryType, null, '  ')}
      </pre>
      <h3>mutationType</h3>
      <pre>
        {JSON.stringify(mutationType, null, '  ')}
      </pre>
      <h3>subscriptionType</h3>
      <pre>
        {JSON.stringify(subscriptionType, null, '  ')}
      </pre>
      <h2>User types</h2>
      <pre>
        {JSON.stringify(types, null, '  ')}
      </pre>
      <h2>Directives</h2>
      <pre>
        {JSON.stringify(directives, null, '  ')}
      </pre>
      <h4>Pretty cool, huh?</h4>
    </div>
  );

};

export default graphql(IntrospectionQuery)(App);