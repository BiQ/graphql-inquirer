import React from 'react';

import QueryField from './query_field.jsx';

const QueryFieldset = (props) => {

  const {
    fields,
    toggle
  } = props;

  return (
    <div className="query-fieldset">
      { fields && Array.isArray(fields) &&
        fields.map((d, i) => {
          return (<QueryField field={d} toggle={toggle} key={i} />);
        })
      }
    </div>
  );

}

export default QueryFieldset;