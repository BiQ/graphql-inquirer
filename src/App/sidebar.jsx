import React from 'react';

const Sidebar = (props) => {

  const {
    types,
    queries,
    mutations,
    subscription
  } = props;

  console.log('sidebar', props);

  return (
    <div>
      <h3>I am sidebar</h3>
      <pre>
        {JSON.stringify(queries)}
      </pre>
    </div>
  )

};

export default Sidebar;