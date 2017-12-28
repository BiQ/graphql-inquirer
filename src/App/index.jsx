import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import Sidebar from './sidebar.jsx';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      types: [],
      queries: [],
      mutations: [],
      subscriptions: [],
      activeQuery: null,
      gqlQuery: null,
      outputFormat: 'separate'
    }

  }

  componentWillReceiveProps(props) {
    const {
      loading,
      error,
      data
    } = props;

    const { __schema } = data;

    if (__schema) {
      const {
        queryType,
        mutationType,
        subscriptionType,
        types,
        directives
      } = __schema;

      console.log('types', types, queryType, mutationType)

      if (data && __schema  && !loading) {
        if (types) {
          //extract types
          this.setState({types});
          //extract queries
          if (queryType && queryType.name) {
            let qt = types.find((obj) => (obj.name === queryType.name));
            this.setState({
              queries: qt.fields || []
            });
          }
          if (mutationType && mutationType.name) {
            let mt = types.find((obj) => (obj.name === mutationType.name));
            this.setState({
              mutations: mt.fields || []
            });
          }
          if (subscriptionType && subscriptionType.name) {
            let st = types.find((obj) => (obj.name === subscriptionType.name));
            this.setState({
              subscriptions: st.fields || []
            });
          }
        }
      }
    }
  }

  render() {

    console.log('render app', this.props)

    let data = this.props.data;

    const {
      types,
      queries,
      mutations,
      subscriptions
    } = this.state;

    let sidebarProps = {
      types,
      queries,
      mutations,
      subscriptions
    };

    return (
        <BrowserRouter>
          <div>
            <Sidebar {...sidebarProps}  />
            <Route path="/" component={Test} />
            <Link to="/test">Klik for test</Link>
            <h1>GraphQL magic</h1>
            <pre>
              {JSON.stringify(this.state, null, '  ')}
            </pre>
          </div>
        </BrowserRouter>
      );

  }
/*
  const {
    data
  } = props;

  if (data.__schema) {
    const {
      queryType,
      mutationType,
      subscriptionType,
      types,
      directives
    } = data.__schema;

    if (data && __schema  && !loading) {
      if (types) {
        //extract types
        this.setState({types});
        //extract queries
        if (queryType && queryType.name) {
          this.setState({
            queries: find(types, (obj) => {return obj.name === queryType.name}).fields || []
          });
        }
        if (mutationType && mutationType.name) {
          this.setState({
            mutations: find(types, (obj) => {return obj.name === mutationType.name}).fields || []
          });
        }
        if (subscriptionType && subscriptionType.name) {
          this.setState({
            subscriptions: find(types, (obj) => {return obj.name === subscriptionType.name}).fields || []
          });
        }
      }
    }
  }

  console.log(props);

  return (
    <BrowserRouter>
      <div>
        <Sidebar />
        <Route path="/" component={Test} />
        <Link to="/test">Klik for test</Link>
        <h1>GraphQL magic</h1>
        <pre>
          {JSON.stringify(data, null, '  ')}
        </pre>
      </div>
    </BrowserRouter>
  );
*/
};

export default App;

const Test = (props) => {

  const { match } = props;
  console.log(props);

  return (
    <div>
      <Route path={`/test`} render={() => (<h1>TEST</h1>)} />
      Test
    </div>
  )

}