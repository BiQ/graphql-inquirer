import React from 'react';
import {
  Route,
  BrowserRouter
} from 'react-router-dom';

import Styles from './Styles/app.scss';
import LoadSpinner from './Utility/spinner.jsx';

import {
  getSchemaWithFetcher,
  transformSchema
} from './Utility/fetcher.js';

import Sidebar from './App/sidebar.jsx';
import Content from './App/content.jsx';

class Inquirer extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      fetcher: props.fetcher,
      loading: true,
      schema: null
    };

    console.log('props', typeof props.fetcher);

    getSchemaWithFetcher(props.fetcher)
      .then((schema) => {
        console.log('received schema');
        this.setState({
          schema: transformSchema(schema.schema),
          loading: false
        });
      });
  }

  render() {

    const { loading, schema } = this.state;
    let self = this;

    const Markup = function(markupProps) {
      if (loading) {
        return (<div id="inquirer-body"><LoadSpinner /></div>);
      } else {
        console.log(loading, schema);

        const { types, queries, mutations, subscriptions } = schema;

        let sharedProps = {
          types, 
          queries, 
          mutations,
          subscriptions,
          loading: self.state.loading
        };

        console.log(sharedProps, markupProps.routeProps)

        return (
          <div id="inquirer-body">
            <Sidebar sharedProps={sharedProps} {...markupProps.routeProps} />
            <Content sharedProps={sharedProps} {...markupProps.routeProps} />
          </div>
        );
      }
    }
/*
    let markup = loading
                  ? (<div id="inquirer-body"><LoadSpinner /></div>)
                  : (<div id="inquirer-body">
                      <Sidebar sharedProps={sharedProps} {...sidebarProps} {...routeProps} />
                      <Content sharedProps={sharedProps} {...contentProps} {...routeProps} />
                    </div>);
*/
    return (
      <BrowserRouter>
        <Route path="/" render={(routeProps) => {
          return(
          <div id="inquirer-app">
            <div id="inquirer-header">GraphQL Inquirer</div>
            
            <Markup routeProps={routeProps} />

          </div>)
        }} />
      </BrowserRouter>
    );
  }

}

export default Inquirer;

/*
APPLICATION SHAPE
App: (fetcher) + runFunc
- Header: move controls here?
- Body
  - Sidebar
  - Editor
    - Split1: EditorBuilder
    - Split2: EditorGenerated
    - Split3: EditorResult


STATE SHAPE

 */