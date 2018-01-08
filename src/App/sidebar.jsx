import React from 'react';
import {
  Link,
  NavLink,
  Route
} from 'react-router-dom';

import {
  RecursiveType
} from '../Utility/utility.jsx';

import LoadSpinner from '../Utility/spinner.jsx';

const Sidebar = (props) => {

  const {
    loading,
    sharedProps
  } = props;

  const {
    queries,
    mutations,
    subscriptions
  } = sharedProps;

  return (
    <Route path="/:action" children={({match}) => {
      return (
        <div id="inquirer-sidebar">
          <SidebarSection title="Queries" path="/queries" items={queries} loading={loading} />
          <SidebarSection title="Mutations" path="/mutations" items={mutations} />
          <SidebarSection title="Subscriptions" path="/subscriptions" items={subscriptions} />
        </div>
      );
    }} />
  );

};

export default Sidebar;

const SidebarSection = (props) => {

  const {
    title,
    items,
    path,
    loading
  } = props;

  let itemElms;
  if (loading) {
    itemElms = <LoadSpinner />;
  } else {
    itemElms = items.map((d, i) => (
      <SidebarItem path={path} item={d} key={i} />
    ));
  }

  return (
    <div className="sidebar-section">
      <div className="sidebar-section-title">{title}</div>
      {itemElms}
    </div>
  );

};

const SidebarItem = (props) => {

  const { item, path } = props;

  const {
    name,
    type,
    description
  } = item;

  return (
    <NavLink to={`${path}/${name}`} className="sidebar-item">
      <div className="sidebar-item-name">{name}</div>
      <div className="sidebar-item-type"><RecursiveType type={type} /></div>
      <div className="sidebar-item-description">{description}</div>
    </NavLink>
  );

};