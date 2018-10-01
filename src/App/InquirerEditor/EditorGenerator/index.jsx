import React from 'react';
import PropTypes from 'prop-types';

import { 
  GetTypeName,
  RecursiveTypeString 
} from 'UtilityPath/utility.jsx';

const EditorGenerator = (props) => {

  const {
    operation,
    operationType,
    outputFormat,
    valid
  } = props;

  let inline = false;
  let requestBody = false;

  switch (outputFormat) {
    case 'separate':
      requestBody = false;
      inline = false;
      break;
    case 'inline':
      requestBody = false;
      inline = true;
      break;
    case 'json':
      requestBody = true;
      break;
  }

  let qText = SplitQuery(operation, inline, requestBody, operationType);

  return (
    <div id="operation-generated">
      <div className="generated-content">
        <div className="copy-button">
        </div>
        { operation &&
          <div className="operation-result-gql">
            <div className={('gql-panel'+(valid ? '' : ' invalid'))}>
              {qText}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

EditorGenerator.propTypes = {
  operation: PropTypes.object,
  operationType: PropTypes.string,
  outputFormat: PropTypes.string,
  valid: PropTypes.bool
};

export default EditorGenerator;

const SplitQuery = (query, inline=false, requestBody=false, operationType = null) => {
  
  var newlines = true;

  if (requestBody) {
    newlines = false;
    inline = false;
  }

  let singularTypeList = {
    queries: { lower:'query', upper:'Query' },
    mutations: { lower: 'mutation', upper: 'Mutation' },
    subscriptions: { lower: 'subscription', upper: 'Subscription'}
  };

  let singularType = singularTypeList[operationType] || {lower:'unknown', upper: 'Unknown'};

  var qString = '';
  var varObj = {};
  var varArray = [];

  var nChar = newlines ? '\n' : ' '; // newline character (if newlines=true)
  var tChar = newlines ? '  ' : ''; // tab character

  const qFields = (field, indent=0) => {

    var fieldString = '';

    if (field.name && field.include) {

      var args = field.args;
      var argString = '';

      if (args && Array.isArray(args)) {

        args.map((d) => {
          var argName = d.name;
          var argValue = d.value;
          var hasValue = (argValue && typeof(argValue) === 'string' && argValue != '');

          var typeString = RecursiveTypeString(d.type);

          switch (GetTypeName(d.type)) {
            case 'Int':
              argValue = parseInt(d.value);
              break;
            case 'Float':
              argValue = parseFloat(d.value);
              break;
            case 'Boolean':
              argValue = JSON.parse(d.value);
              break;
          }

          if (hasValue) {
            var varName = argName;

            var ii = 0;
            while (varObj.hasOwnProperty(varName)) {
              varName = varName+ii;
              ii++;
            }

            var inlineValue = '$'+varName;
            if (inline) {
              inlineValue = JSON.stringify(argValue);
            } else {
              varObj[varName] = {
                value: argValue,
                type: typeString 
              };
              varArray.push({
                name: varName,
                value: argValue,
                type: typeString
              });
            }

            if (argString !== '') argString += ', ';
            argString += `${argName}: ${inlineValue}`;
          }
        });
      }

      let subFields = field.fields;
      let subFieldString = '';

      if (subFields && Array.isArray(subFields) && subFields.length > 0) {
        subFields.map((d) => {
          let sfs = qFields(d, indent+1);
          subFieldString += ((sfs && sfs != '') ? `${nChar}${sfs}` : '');
        });
        if (subFieldString !== '') subFieldString += nChar;
      }
      

      fieldString += field.name;
      if (argString !== '') fieldString += `(${argString})`;
      if (subFieldString !== '') fieldString += ` {${subFieldString+(tChar.repeat(indent))}}`;

    }

    return (fieldString != '' ? tChar.repeat(indent)+fieldString : '');

  };

  let recursedString = qFields(query, 1);

  let gotVars = false;
  if (varArray && (varArray.length && (varArray.length > 0))) {
    gotVars = true;
  }

  let argTypeString = '';
  let argObject = {};

  
  if (gotVars) {
    let firstArg = true;
    varArray.map((varInfo) => {
      if (!firstArg) argTypeString += ', ';
      else firstArg = false;
      argTypeString += `$${varInfo.name || 'error'}: ${(varInfo.type) || 'oops'}`;
      argObject[varInfo.name] = varInfo.value;
    });
  }

  argTypeString = (argTypeString && argTypeString !== '') ? `(${argTypeString})` : '';

  let operationName = GetTypeName(query.type)+singularType.upper;

  qString = `${singularType.lower} ${operationName}${argTypeString} {${nChar}`;
  qString += recursedString;
  qString += nChar+'}';

  let varString = gotVars ? JSON.stringify(argObject, null, tChar) : '';
  let whiteSpace = gotVars ? '\n\n' : '';

  if (requestBody) {
    let escapedVars = varString;
    let reqBodyObj = {
      query: qString,
      variables: escapedVars,
      operationName
    };

    let reqBodyString = JSON.stringify(reqBodyObj, null, 2);

    return reqBodyString;
  } else return varString+whiteSpace+qString;
};