import React from 'react';
import {
  Route,
  HashRouter,
  withRouter
} from 'react-router-dom';

import './Styles/app.scss';

import LoadSpinner from './Utility/spinner.jsx';

import {
  getSchemaWithFetcher,
  transformSchema
} from './Utility/fetcher.js';

import { trimSlash } from './Utility/utility';

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

        let {
          match: {
            url
          }
        } = markupProps.routeProps;

        return (
          <div id="inquirer-body">
            <Sidebar sharedProps={sharedProps} {...markupProps.routeProps} />
            <Route path={`${trimSlash(url)}/:action/:name`} render={(rpProps) => {
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
      <Route path={`${self.props.match.url}`} component={(routeProps) => {
        return(
        <div id="inquirer-app">
          <div id="inquirer-header">GraphQL Inquirer</div>
          
          <Markup routeProps={routeProps} />

        </div>);
      }} />
    );
  }

}

const InquirerWrapped = (props) => {

  let InquirerWithRouter = withRouter(Inquirer);

  return props.isInARouter 
          ? <InquirerWithRouter {...props} /> 
          : <HashRouter><InquirerWithRouter {...props} /></HashRouter>;

};

export default InquirerWrapped;

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