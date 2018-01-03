import React from 'react';

import SplitPane from 'react-split-pane';

import {
  RecursiveType, 
  RecursiveTypeString,
  GetTypeName
} from '../../Utility/utility.jsx';

import QueryFieldset from './query_fieldset.jsx';

const QueryBuilder = (props) => {

  console.log('props', props)
  const {
    match,
    sharedProps
  } = props;

  const {
    loading,

    types,
    queries,
    mutations,
    subscriptions
  } = sharedProps;

  const {
    action,
    name
  } = match.params;
  
  if (loading) {
    return <div>Loading...</div>
  }

  let actionList = sharedProps[action];
  if (!actionList || typeof(actionList) != 'object') {
    throw new Error(`Action '${action}' was not found`);
  }

  let actionObj = actionList.find((d) => (d.name == name));

  if (typeof actionObj != 'object') {
    throw new Error(`Could not find ${name} in ${action}`);
  }

  // --- YOU ARE HERE ---

  let argElms = [];
  if (actionObj.args && typeof(actionObj.args) === 'object' && actionObj.args.length > 0) {
    argElms = actionObj.args.map((d,i) => (<QueryArg {...d} key={i} />));
  }

  let typeName = GetTypeName(actionObj.type);
  let type = types.find((t) => (t.name == typeName));

  //let fieldElms = type.fields.map((f,i) => (<QueryField {...f} key={i} />));

  let fields = type.fields;

  console.log(actionObj, typeName, type.fields);

  return (
    <div id="api-main">
      <div className="api-main-container">
        {/* TOOLBAR */}
        <div className="api-main-toolbar">
          <div className="query-toolbar">
            <div className="query-header">
              <div className="query-name">{actionObj.name}</div>
              <div className="query-type">
                <span className="type-name">{actionObj.type && <RecursiveType type={actionObj.type} />}</span>
              </div>
              <p>{actionObj.description}</p>
            </div>
            <div className="query-controls">
              <div className="query-control-picker">
                <select name="split-direction-picker">
                  <option value="horizontal-vertical">[┴]</option>
                  <option value="vertical-vertical">[||]</option>
                </select>
              </div>
              <div className="query-control-picker">
                <select name="output-format-picker">
                  <option value="separate">Separate variables</option>
                  <option value="inline">Inline variables</option>
                  <option value="json">Formatted JSON request</option>
                </select>
              </div>
              <button type="button" disabled="">Run</button>
            </div>
          </div>
        </div>
        {/* /TOOLBAR */}
        <div className="query-main">
          <SplitPane split="vertical" minSize={50}>
              <div></div>
              <SplitPane split="horizontal">
                  <div></div>
                  <div></div>
              </SplitPane>
          </SplitPane>
          {/*
          <SplitPane split="vertical" minSize={50} defaultSize={100}>
            <div>Test</div>
            <div></div>
          </SplitPane>
          <SplitPane split="horizontal" defaultSize={200}>
            <div>HORIZONTAL</div>
          </SplitPane>
          <h3>Args</h3>
          <div>
            {argElms}
          </div>
          <h3>Fields</h3>
          <div className="query-body">
            {fields && <QueryFieldset fields={fields} toggle={()=>{console.log('toggled')}} />}
          </div>
          <pre>
            {JSON.stringify(actionObj, null, '  ')}
          </pre>
          */}

        </div>
      </div> 
    </div>
  );
}

export default QueryBuilder;

const QueryArg = (props) => {

  const {
    name,
    description,
    type,
    defaultValue
  } = props;

  return (
    <div>{name} - {description}: { RecursiveTypeString(type) }</div>
  );

};

const QueryField = (props) => {

  const {
    args,
    deprecationReason,
    description,
    isDeprecated,
    name,
    type
  } = props;

  return (
    <div>
      {name}: {RecursiveTypeString(type)}
    </div>
  );

};