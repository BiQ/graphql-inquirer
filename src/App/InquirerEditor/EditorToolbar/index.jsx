import React from 'react';

import { RecursiveType } from 'UtilityPath/utility.jsx'; 

const EditorToolbar = (props) => {

  const {
    actionObj,
    paneMode,
    paneModeCallback
  } = props;
  
  return (
    <div className="editor-toolbar">
      <div className="action-toolbar">
        <div className="action-header">
          <div className="action-name">{actionObj.name}</div>
          <div className="action-type">
            <span className="type-name">{actionObj.type && <RecursiveType type={actionObj.type} />}</span>
          </div>
          <p>{actionObj.description}</p>
        </div>
        <div className="editor-controls">
          <div className="editor-control-picker">
            <select name="split-direction-picker" defaultValue={paneMode} onChange={paneModeCallback}>
              <option value="hv">[┴]</option>
              <option value="vv">[||]</option>
            </select>
          </div>
          <div className="editor-control-picker">
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
  );
};

export default EditorToolbar;