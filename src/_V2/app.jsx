import React from 'react';
import * as GraphQL from 'graphql';

class Inquirer extends React.Component {

  constructor(props) {
    super(props);
    
    if (!props.fetcher || typeof(props.fetcher) != 'function') throw new Error('A fetcher function was not provided');
    this.state = {
      fetcher: props.fetcher,
      schema: null
    };

    this.fetchSchema();
  }

  render() {
    return (
      <div id="inquirer-application">
        <div id=
        INQUIRER
        <pre>
          {JSON.stringify(this.state.schema, null, '  ')}
        </pre>
      </div>
    )
  }

  fetchSchema() {
    const { fetcher } = this.state;
    fetcher({ query: GraphQL.introspectionQuery })
      .then((res) => {
        console.log('res', res);
        if (res.data && res.data.hasOwnProperty('__schema')) {
          this.setState({ schema: res.data['__schema'] });
        } else {
          throw new Error('Couldn\'t fetch schema');
        }
      }).catch((error) => {throw new Error('An error occured while fetching', error);});
  }

}

export default Inquirer;

/*
APPLICATION SHAPE
App: (selector, fetcher) + runFunc
- Header: move controls here?
- Body
  - Sidebar
  - Editor
    - Split1: EditorBuilder
    - Split2: EditorGenerated
    - Split3: EditorResult
*/