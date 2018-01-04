import React from 'react';
import SplitPane from 'react-split-pane';

import { Route } from 'react-router-dom';

import EditorToolbar from 'AppPath/InquirerEditor/EditorToolbar';
import EditorCreator from 'AppPath/InquirerEditor/EditorCreator';
import EditorGenerator from 'AppPath/InquirerEditor/EditorGenerator';


import {
  RecursiveType, 
  RecursiveTypeString,
  GetTypeName
} from 'UtilityPath/utility.jsx';

//import QueryFieldset from './query_fieldset.jsx';

class InquirerEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pane_mode: 'vv',
      pane_mode_changed: false
    };
  }

  render () {

    const {
      match,
      sharedProps
    } = this.props;

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

    if (typeof actionObj != 'object') throw new Error(`Could not find ${name} in ${action}`);

    let actionType = types.find((d) => (d.name = GetTypeName(actionObj.type)));

    let pane_class = this.state.pane_mode === 'vv' ? 'vertical' : 'horizontal';
    let pane_default_size = this.state.pane_mode === 'vv' ? '66%' : '50%';

    return (
      <div id="editor-container">
        {/* TOOLBAR */}
        <EditorToolbar actionObj={actionObj} paneMode={this.state.pane_mode} paneModeCallback={this.pickPaneMode.bind(this)} />
      
        <div id="editor-panes">
          <SplitPane split={pane_class} minSize={50} maxSize={-50} defaultSize={pane_default_size}>
            <SplitPane split="vertical" minSize={50} maxSize={-50} defaultSize={'50%'}>

              <EditorCreator 
                name={actionObj.name} 
                args={actionObj.args}
                fields={actionType.fields}
                onInputChange={()=>{console.log('input changed');}}
                toggle={()=>{console.log('toggled field');}}
              />

              <EditorGenerator />

            </SplitPane>

            <div>
              OUTPUT
              {/*
              <Route path={queryPath} children={(otherNameForRouteProps) => {
                console.log('routeprops', otherNameForRouteProps);
                return (
                  <div>HAPS</div>
                )
              }} />
              */}
            </div>

          </SplitPane>
        </div>
      </div> 
    );
  }

  // additional methods
  pickPaneMode(evt) {
    this.setState({
      pane_mode: evt.target.value,
      pane_mode_changed: true
    });
  }

}

export default InquirerEditor;