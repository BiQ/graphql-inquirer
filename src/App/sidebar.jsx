import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  Route,
  withRouter
} from 'react-router-dom';

import {
  RecursiveType,
  trimSlash
} from '../Utility/utility.jsx';

import LoadSpinner from '../Utility/spinner.jsx';

const Sidebar = (props) => {

  const {
    loading,
    sharedProps,
    match
  } = props;

  const {
    queries,
    mutations,
    subscriptions
  } = sharedProps;

  return (
    <Route path={`${trimSlash(match.url)}/:action?`} render={() => {
      return (
        <div id="inquirer-sidebar">
          <SidebarSection title="Queries" path="/queries" items={queries} loading={loading} root={trimSlash(match.url)} />
          <SidebarSection title="Mutations" path="/mutations" items={mutations} root={trimSlash(match.url)} />
          <SidebarSection title="Subscriptions" path="/subscriptions" items={subscriptions} root={trimSlash(match.url)} />
        </div>
      );
    }} />
  );
};

Sidebar.propTypes = {
  loading: PropTypes.bool,
  sharedProps: PropTypes.any,
  match: PropTypes.object
};

export default withRouter(Sidebar);

const SidebarSection = (props) => {

  const {
    title,
    items,
    path,
    loading,
    root
  } = props;

  let itemElms;
  if (loading) {
    itemElms = <LoadSpinner />;
  } else {
    itemElms = items.map((d, i) => (
      <SidebarItem path={root+path} item={d} key={i} />
    ));
  }

  return (
    <div className="sidebar-section">
      <div className="sidebar-section-title">{title}</div>
      {itemElms}
    </div>
  );

};

SidebarSection.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  path: PropTypes.string,
  loading: PropTypes.bool,
  root: PropTypes.string
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

SidebarItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string, 
    type: PropTypes.object, 
    description: PropTypes.string
  }),
  path: PropTypes.string
};