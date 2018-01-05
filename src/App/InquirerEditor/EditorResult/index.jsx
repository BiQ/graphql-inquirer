import React from 'react';

const EditorResult = (props) => {

  const { activeResult } = props;

  return (
    <div id="editor-result">
      <div className="result-data">
        {JSON.stringify(activeResult, null, '  ')}
      </div>
    </div>
  );

};

export default EditorResult;