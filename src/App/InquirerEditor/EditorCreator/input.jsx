import React from 'react';
import PropTypes from 'prop-types';

import {
  RecursiveType
} from 'UtilityPath/utility.jsx';

const CreatorInput = (props) => {

  const {
    operationName,
    onChange,
    args
  } = props;

  return (
    <div className="input-form">
      <form autoComplete="off" name={operationName+'_input'}>
        <table>
          <tbody>
            { args &&
                args.map((d, i) => {
                  return (
                    <tr className="input-field" key={i} >
                      <td>
                        <span className="input-field-name">{d.name}</span>
                      </td>
                      <td>
                        <input type="text" name={d.name} id={'qi_'+operationName+'_'+d.name} onChange={onChange} />
                      </td>
                      <td>
                        <span className="input-field-type"><RecursiveType type={d.type} /></span>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
      </form>
    </div>
  );
};

CreatorInput.propTypes = {
  operationName: PropTypes.string,
  onChange: PropTypes.func,
  args: PropTypes.array
};

export default CreatorInput;