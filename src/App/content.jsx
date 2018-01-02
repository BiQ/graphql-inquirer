import React from 'react';
import {
  Route
} from 'react-router-dom';

import LoadSpinner from '../Utility/spinner.jsx';
import QueryBuilder from './QueryBuilder';

const Content = (props) => {

  const { 
    types,
    queries
  } = props;

  console.log('types', types, queries);

  return (
    <div id="inquirer-content">
      {/*<LoadSpinner />*/}
      This is content! {props.hej}
      <Route path="/queries/:name" render={(routeProps) => {
        return (
          <QueryBuilder {...routeProps} {...props} />
        )
      }} />
      <Route path="/mutations/:name" render={(routeProps) => (
        <div>A Mutation was picked: {routeProps.match.params.name}</div>
      )} />
      <Route path="/subscriptions/:name" render={(routeProps) => (
        <div>A Subscription was picked: {routeProps.match.params.name}</div>
      )} />
    </div>
  );
};

export default Content;
/*<div>A Query was picked: {routeProps.match.params.name}</div>*/