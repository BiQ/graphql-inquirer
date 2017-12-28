import React from 'react';
import {
  Link,
  Route
} from 'react-router-dom';

const Sidebar = (props) => {

  const {
    types,
    queries,
    mutations,
    subscriptions
  } = props;

  console.log('sidebar', props);

  return (
    <div id="inquirer-sidebar">
      <h3>Queries</h3>
      {queries.map((q, i) => (
        <div className="sidebar-field" key={'q'+i}>
          <Link to={`/query/${q.name}`}>
            {q.name}
          </Link>
          <Route path={`/query/${q.name}`} render={() => (<div style={{height:'1px', backgroundColor:'blue'}}></div>)} />
        </div>
      ))}
      <h3>Mutations</h3>
      {mutations.map((m, i) => (<div className="sidebar-field" key={'m'+i}>{m.name}</div>))}
      <h3>Subscriptions</h3>
      {subscriptions.map((s, i) => (<div className="sidebar-field" key={'s'+i}>{s.name}</div>))}
    </div>
  );

};

export default Sidebar;