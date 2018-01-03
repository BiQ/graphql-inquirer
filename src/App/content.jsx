import React from 'react';
import {
  Route
} from 'react-router-dom';

import LoadSpinner from '../Utility/spinner.jsx';
import QueryBuilder from './QueryBuilder';

const Content = (props) => {

  const {
    match,
    sharedProps 
  } = props;

  let pathString = `${match.url}/:action/:name`;
  pathString = pathString.replace('//', '/');

  return (
    <div id="inquirer-content">
      <Route path={pathString} render={(routeProps) => {
        console.log('Spoing', routeProps);
        return (
          <QueryBuilder sharedProps={sharedProps} {...routeProps} />
        );
      }} />

    </div>
  );
};

export default Content;
/*<div>A Query was picked: {routeProps.match.params.name}</div>*/