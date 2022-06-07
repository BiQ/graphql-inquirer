import React from 'react';
import PropTypes from 'prop-types';
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
};

CreatorFieldset.propTypes = {
  fields: PropTypes.array,
  toggle: PropTypes.func
};

export default CreatorFieldset;
