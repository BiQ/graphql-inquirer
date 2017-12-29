import React from 'react';
import {
  Route
} from 'react-router-dom';

import LoadSpinner from '../Utility/spinner.jsx';

const Content = (props) => {

  const {match} = props;

  console.log('match', match);

  return (
    <div id="inquirer-content">
      {/*<LoadSpinner />*/}
      This is content! {props.hej}
      <Route path="/query/:q_name" render={(routeProps) => (
        <div>A Query was picked: {routeProps.match.params.q_name}</div>
      )} />
    </div>
  )
};

export default Content;