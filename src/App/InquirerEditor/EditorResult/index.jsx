import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'react-clipboard.js';

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
      <div className="copy-button">
        <Clipboard data-clipboard-target="#query-result-data">
          Copy
        </Clipboard>
      </div>
      <div className="result-data" id="query-result-data">
        {markup}
      </div>
    </div>
  );
};

EditorResult.propTypes = {
  activeResult: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool
};

export default EditorResult;
