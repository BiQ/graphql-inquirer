import React from 'react';

import CreatorField from './field.jsx';

const CreatorFieldset = (props) => {

  const {
    fields,
    toggle
  } = props;

  return (
    <div className="creator-fieldset">
      { fields && Array.isArray(fields) &&
        fields.map((d, i) => {
          return (<CreatorField field={d} toggle={toggle} key={i} />);
        })
      }
    </div>
  );

}

export default CreatorFieldset;