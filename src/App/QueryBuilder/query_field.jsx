import React from 'react';

import QueryFieldset from './query_fieldset.jsx';
import { RecursiveType } from '../../Utility/utility';

const QueryField = (props) => {

  const {
    field,
    toggle
  } = props;

  const {
    name,
    description,
    type
  } = field;

  let isIncluded = field.include || false;

  let isRequired = (type && type.kind === 'NON_NULL');
  let requiredClass = '';

  if (field.fields && Array.isArray(field.fields) && field.fields.length > 0) {
    requiredClass = ' needed';
    field.fields.forEach((d) => {
      if (d.include) requiredClass = '';
    })
  }

  return (
    <div className="query-field-container">
      <div className="query-field" onClick={() => {toggle(field)}}>
        <div className="field-checkbox">
          <div className={"field-checkmark"+(field.include ? ' checked' : '')}></div>
        </div>
        <div className={"field-name"+requiredClass}>
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
          <QueryFieldset fields={field.fields} toggle={toggle} />
        </div>
      }
    </div>
  );

}

export default QueryField;