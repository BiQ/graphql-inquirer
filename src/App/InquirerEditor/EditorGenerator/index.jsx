import React from 'react';

import { 
  GetTypeName,
  RecursiveTypeString 
} from 'UtilityPath/utility.jsx';

const EditorGenerator = (props) => {

  const {
    operation,
    //inline,
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

  let qText = SplitQuery(operation, inline, requestBody);

  return (
    <div id="query-generated">
      <div className="generated-content">
        <div className="copy-button">
        {/*
          <ClipboardButton data-clipboard-text={qText}>Kopiér</ClipboardButton>
        */}
        </div>
        { operation &&
          <div className="query-result-gql">
            <div className={("gql-panel"+(valid ? '' : ' invalid'))}>
              {qText}
            </div>
          </div>
        }
      </div>
    </div>
  )
  /*
  return (
    <h3>Weeeee! I Am Generator!</h3>
  );
  */
};



export default EditorGenerator;

const SplitQuery = (query, inline=false, requestBody=false) => {
  
  var newlines = true;

  if (requestBody) {
    newlines = false;
    inline = false;
  }

  //initiate; varArray, qString
  var qString = "";
  var varObj = {};
  var varArray = [];

  var nChar = newlines ? '\n' : ' '; // newline character (if newlines=true)
  var tChar = newlines ? '  ' : ''; // tab character

  const qFields = (field, indent=0) => {

    var fieldString = "";

    if (field.name && field.include) {

      var args = field.args;
      var argString = "";

      if (args && Array.isArray(args)) {

        args.map((d,i) => {
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

            console.log(varName)
            var i = 0;
            while (varObj.hasOwnProperty(varName)) {
              varName = varName+i;
              i++;
            }

            var inlineValue = "$"+varName;
            if (inline) {
              inlineValue = JSON.stringify(argValue);
            } else {
              varObj[varName] = {
                value: argValue,
                type: typeString 
              }
              varArray.push({
                name: varName,
                value: argValue,
                type: typeString
              })
            }

            if (argString !== "") argString += ", ";
            argString += `${argName}: ${inlineValue}`;
          }
        })
      }

      let subFields = field.fields;
      let subFieldString = "";

      if (subFields && Array.isArray(subFields) && subFields.length > 0) {
        subFields.map((d, i) => {
          let sfs = qFields(d, indent+1);
          subFieldString += ((sfs && sfs != "") ? `${nChar}${sfs}` : "");
        })
        if (subFieldString !== "") subFieldString += nChar;
      }
      

      fieldString += field.name;
      if (argString !== "") fieldString += `(${argString})`;
      if (subFieldString !== "") fieldString += ` {${subFieldString+(tChar.repeat(indent))}}`;

    }

    return (fieldString != "" ? tChar.repeat(indent)+fieldString : "");
    //return ((fieldString && fieldString !== "") ? `${fieldString.trim()}` : "");

  }

  let recursedString = qFields(query, 1);

  let gotVars = false;
  if (varArray && (varArray.length && (varArray.length > 0))) {
    gotVars = true;
  }

  //console.log('gotVars?', gotVars, varArray, typeof(varArray), JSON.stringify(varArray));

  let argTypeString = "";
  let argObject = {};

  
  if (gotVars) {
    let firstArg = true;
    varArray.map((varInfo, i, a) => {
      if (!firstArg) argTypeString += ', ';
      else firstArg = false;
      argTypeString += `\$${varInfo.name || 'fejl'}: ${(varInfo.type) || 'ups'}`;
      argObject[varInfo.name] = varInfo.value;
    })
  }

  argTypeString = (argTypeString && argTypeString !== "") ? `(${argTypeString})` : '';

  let operationName = GetTypeName(query.type)+'Query';

  qString = `query ${operationName}${argTypeString} {${nChar}`;
  qString += recursedString;
  qString += nChar+'}';

  let varString = gotVars ? JSON.stringify(argObject, null, tChar) : "";
  let whiteSpace = gotVars ? '\n\n' : '';

  console.log('varString', varString);

  if (requestBody) {
    let escapedVars = varString;//.replace(/\"/g, "\"").replace(/\'/g, "\'").replace(/\n/g, " ");
    let reqBodyObj = {
      query: qString,
      variables: escapedVars,
      operationName
    }

    let reqBodyString = JSON.stringify(reqBodyObj, null, 2);
    console.log('reqBodyString', reqBodyString);
    return reqBodyString;
  } else return varString+whiteSpace+qString;
}