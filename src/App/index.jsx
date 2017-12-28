import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import Sidebar from './sidebar.jsx';
import Content from './content.jsx';

import styles from '../Styles/app.scss';

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

    // todo
    let contentProps = {
      hej: 'halløj'
    };

    return (
        <BrowserRouter>
          {/*<Route path="/" render={(routeProps) => (*/}
            <div id="inquirer-app">
              <div id="inquirer-header">GraphQL Inquirer</div>
              <div id="inquirer-body">
                <Sidebar {...sidebarProps} />
                <Content {...contentProps} />
              </div>
            </div>
          {/*)} /> */}
        </BrowserRouter>
      );

  }

}

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

};