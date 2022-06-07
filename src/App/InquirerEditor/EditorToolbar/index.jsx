import React from 'react';
import PropTypes from 'prop-types';

import { RecursiveType } from 'UtilityPath/utility.jsx';

const EditorToolbar = (props) => {

  const {
    activeOp,
    paneMode,
    paneModeCallback,
    pickOutputFormat,
    buildOperation
  } = props;

  return (
    <div className="editor-toolbar">
      <div className="action-toolbar">
        <div className="action-header">
          <div className="action-name">{activeOp.name}</div>
          <div className="action-type">
            <span className="type-name">{activeOp.type && <RecursiveType type={activeOp.type} />}</span>
          </div>
          <p>{activeOp.description}</p>
        </div>
        <div className="editor-controls">
          <div className="editor-control-picker">
            <select name="split-direction-picker" defaultValue={paneMode} onChange={paneModeCallback}>
              <option value="hv">[┴]</option>
              <option value="vv">[||]</option>
            </select>
          </div>
          <div className="editor-control-picker">
            <select name="output-format-picker" onChange={pickOutputFormat}>
              <option value="separate">Separate variables</option>
              <option value="inline">Inline variables</option>
              <option value="json">Formatted JSON request</option>
            </select>
          </div>
          <button type="button" disabled={!activeOp.valid} onClick={buildOperation}>Run</button>
        </div>
      </div>
    </div>
  );
};

EditorToolbar.propTypes = {
  activeOp: PropTypes.object,
  paneMode: PropTypes.string,
  paneModeCallback: PropTypes.func,
  pickOutputFormat: PropTypes.func,
  buildOperation: PropTypes.func
};

export default EditorToolbar;
