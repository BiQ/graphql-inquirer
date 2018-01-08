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
import InquirerEditor from 'AppPath/InquirerEditor';

class Inquirer extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      fetcher: props.fetcher,
      loading: true,
      schema: null
    };

    getSchemaWithFetcher(props.fetcher)
      .then((schema) => {
        this.setState({
          schema: transformSchema(schema.schema),
          loading: false
        });
      });
  }

  render() {

    console.log('process', process);

    const { loading, schema } = this.state;
    let self = this;

    const Markup = function(markupProps) {
      if (loading) {
        return (
          <div id="inquirer-body">
            <div id="inquirer-loader">
              <LoadSpinner />
            </div>
          </div>
        );
      } else {
        const { types, queries, mutations, subscriptions } = schema;

        let sharedProps = {
          types, 
          queries, 
          mutations,
          subscriptions,
          loading: self.state.loading
        };

        return (
          <div id="inquirer-body">
            <Sidebar sharedProps={sharedProps} {...markupProps.routeProps} />
            <Route path={`/:action/:name`} render={(rpProps) => {
              return (
                <div id="inquirer-content">
                  <InquirerEditor schema={schema} loading={loading} fetcher={self.state.fetcher} route={rpProps} />
                </div>
              );
            }} />
          </div>
        );
      }
    };

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL+'/'}>
        <Route path="/" render={(routeProps) => {
          return(
          <div id="inquirer-app">
            <div id="inquirer-header">GraphQL Inquirer</div>
            
            <Markup routeProps={routeProps} />

          </div>);
        }} />
      </BrowserRouter>
    );
  }

}

export default Inquirer;

/*
APPLICATION SHAPE
-----------------
App
- Header
- Body
  - Sidebar
  - Editor
    - Split1: EditorBuilder
    - Split2: EditorGenerated
    - Split3: EditorResult
 */