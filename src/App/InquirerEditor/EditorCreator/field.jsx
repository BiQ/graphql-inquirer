import React from 'react';
import PropTypes from 'prop-types';

import CreatorFieldset from './fieldset.jsx';
import { RecursiveType } from 'UtilityPath/utility.jsx';

const CreatorField = (props) => {

  const {
    field,
    toggle
  } = props;

  const {
    name,
    description,
    type
  } = field;

  let requiredClass = '';

  if (field.fields && Array.isArray(field.fields) && field.fields.length > 0) {
    requiredClass = ' needed';
    field.fields.forEach((d) => {
      if (d.include) requiredClass = '';
    });
  }

  return (
    <div className="creator-field-container">
      <div className="creator-field" onClick={() => {toggle(field);}}>
        <div className="field-checkbox">
          <div className={'field-checkmark'+(field.include ? ' checked' : '')}></div>
        </div>
        <div className={'field-name'+requiredClass}>
          {name || 'ukendt'}
        </div>
        <div className="field-type">
          { type &&
            <RecursiveType type={type} />
          }
        </div>
        <div className="field-description">{description || ''}</div>
      </div>
      { field.fields && Array.isArray(field.fields) && (field.fields.length > 0) &&
        <div className="sub-fields">
          <CreatorFieldset fields={field.fields} toggle={toggle} />
        </div>
      }
    </div>
  );
};

CreatorField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.object,
    include: PropTypes.bool,
    fields: PropTypes.arrayOf(PropTypes.shape({
      include: PropTypes.bool
    }))
  }),
  toggle: PropTypes.func
};

export default CreatorField;
