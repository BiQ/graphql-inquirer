import React from 'react';
import {
  Link,
  Route
} from 'react-router-dom';

import LoadSpinner from '../Utility/spinner.jsx';

const Sidebar = (props) => {

  const {
    loading,

    types,
    queries,
    mutations,
    subscriptions
  } = props;

  console.log('sidebar', props);

  return (
    <div id="inquirer-sidebar">
      <SidebarSection title="Queries" items={queries} loading={loading} />
      <SidebarSection title="Mutations" items={mutations} />
      <SidebarSection title="Subscriptions" items={subscriptions} />
    </div>
  );

};

export default Sidebar;

const SidebarSection = (props) => {

  const {
    title,
    items,
    loading
  } = props;

  let itemElms;
  if (loading) {
    itemElms = <LoadSpinner />;
  } else {
    itemElms = items.map((d, i) => (
      <SidebarItem item={d} key={i} />
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

  console.log('sidebar item', props);

  const { name } = props.item;

  return (
    <div className="sidebar-item">{name}</div>
  );

};