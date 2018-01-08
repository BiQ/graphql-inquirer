import React from 'react';

import LoadSpinner from 'UtilityPath/spinner.jsx';

const EditorResult = (props) => {

  const { 
    activeResult,
    loading
  } = props;

  let markup = '';
  if (loading) {
    markup = <div className="result-load-spinner"><LoadSpinner /></div>;
  } else if (activeResult) {
    markup = JSON.stringify(activeResult, null, '  ');
  }

  return (
    <div id="editor-result">
      <div className="result-data">
        {markup}
      </div>
    </div>
  );

};

export default EditorResult;
