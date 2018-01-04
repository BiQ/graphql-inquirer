import React from 'react';

import CreatorInput from './input.jsx';
import CreatorFieldset from './fieldset.jsx';

const EditorCreator = (props) => {

  const {
    name, // the operation name
    args, // argument list
    onInputChange, // callback for updating inputs
    fields, // The list of fields
    toggle // the toggle callback
  } = props;

  return (
    <div id="creator-main">
      { args && Array.isArray(args) && args.length > 0 &&
        <div className="creator-meta">
          <div className="creator-input">
            <CreatorInput args={args} onChange={onInputChange} operationName={name} />
          </div>
        </div>
      }
      <div className="creator-body">
        {fields &&
          <CreatorFieldset fields={fields} toggle={toggle} />
        }
      </div>
    </div>
  );

};

export default EditorCreator;