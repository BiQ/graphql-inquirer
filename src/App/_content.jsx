import React from 'react';
import {
  Route
} from 'react-router-dom';

import LoadSpinner from '../Utility/spinner.jsx';
import InquirerEditor from './InquirerEditor';

const Content = (props) => {

  const {
    match,
    sharedProps 
  } = props;

  let pathString = `/:action/:name`;
  //pathString = pathString.replace('//', '/');

  // TEMP
  let strippedDummyQuery = dummyQuery.trim().replace(/\s*({|})\s*/g, '$1').replace(/\s+/g, '+');

  console.log('normal', dummyQuery);
  console.log('stripped', strippedDummyQuery);
  console.log('encoded', encodeURI(dummyQuery));
  console.log('both', encodeURIComponent(strippedDummyQuery));

  return (
    <div id="inquirer-content">
      <Route path={pathString} render={(routeProps) => {
        return (
          <InquirerEditor sharedProps={sharedProps} {...routeProps} />
        );
      }} />

    </div>
  );
};

export default Content;
/*<div>A Query was picked: {routeProps.match.params.name}</div>*/

const dummyQuery = `
  posts {
    name
    description
  }
`;