import React from 'react';
import SplitPane from 'react-split-pane';

import EditorToolbar from 'AppPath/InquirerEditor/EditorToolbar';
import EditorCreator from 'AppPath/InquirerEditor/EditorCreator';
import EditorGenerator from 'AppPath/InquirerEditor/EditorGenerator';
import EditorResult from 'AppPath/InquirerEditor/EditorResult';


import {
  GetTypeName,
  isOfKind
} from 'UtilityPath/utility.jsx';

import { executeOperation } from 'UtilityPath/fetcher.js';

class InquirerEditor extends React.Component {

  constructor(props) {
    super(props);

    const {
      types,
      queries,
      mutations,
      subscriptions,
    } = this.props.schema;

    this.state = {
      types,
      queries,
      mutations,
      subscriptions,
      
      activeOperation: null,
      activeOperationType: null,
      activeResult: null,

      resultLoading: false,

      outputFormat: 'separate',
      paneMode: 'vv',
    };

    this.validOutputFormats = [
      'separate',
      'inline',
      'json'
    ];
  }

  componentWillMount() {

    const {
      route
    } = this.props;

    const { params } = route.match;
    this.setActiveOperationFromParams(params);

  }

  componentWillReceiveProps(newProps) {

    const {
      route
    } = newProps;
    const { params } = route.match;
    this.setActiveOperationFromParams(params);

  }

  render () {

    const {
      loading
    } = this.props;

    if (loading) {
      return <div>Loading...</div>
    }
    
    let activeOp = this.state.activeOperation;

    if (!activeOp) return <h1>No active operation</h1>

    let pane_class = this.state.paneMode === 'vv' ? 'vertical' : 'horizontal';
    let pane_default_size = this.state.paneMode === 'vv' ? '66%' : '50%';

    return (
      <div id="editor-container">

        <EditorToolbar 
          activeOp={this.state.activeOperation} 
          paneMode={this.state.paneMode} 
          paneModeCallback={this.pickPaneMode.bind(this)}
          pickOutputFormat={this.pickOutputFormat.bind(this)}
          buildOperation={this.buildQuery.bind(this)}
        />
      
        <div id="editor-panes">
          <SplitPane split={pane_class} minSize={50} maxSize={-50} defaultSize={pane_default_size}>
            <SplitPane split="vertical" minSize={50} maxSize={-50} defaultSize={'50%'}>

              <EditorCreator 
                name={activeOp.name} 
                args={activeOp.args}
                fields={activeOp.fields}
                onInputChange={this.updateInput.bind(this)}
                toggle={this.toggleField.bind(this)}
              />

              <EditorGenerator 
                operation={this.state.activeOperation}
                operationType={this.state.activeOperationType}
                valid={this.state.activeOperation.valid}
                outputFormat={this.state.outputFormat}
              />

            </SplitPane>

            <EditorResult activeResult={this.state.activeResult} loading={this.state.resultLoading} />

          </SplitPane>
        </div>
      </div> 
    );
  }

  // additional methods
  pickPaneMode(evt) {
    this.setState({
      paneMode: evt.target.value,
    });
  }

  pickOutputFormat(event) {

    let format =  event.target.value;

    if (this.validOutputFormats.indexOf(format) >= 0) {
      this.setState({outputFormat: format});
    } else {
      throw new Error('Received invalid output format: '+format);
    }

  }

  setActiveOperation(op, op_type, op_action) {
    let newOperation = null;

    if (op && op_type) {

      newOperation = JSON.parse(JSON.stringify(op));

      if (newOperation && newOperation.type && GetTypeName(newOperation.type)) {
        let tn = GetTypeName(newOperation.type);
        let typeObj = this.state.types.find((d) => {
          return d.name === tn;
        })
        if (typeObj && typeObj.fields) {
          newOperation.fields = JSON.parse(JSON.stringify(typeObj.fields));
        }
      }

      newOperation.include = true;

      newOperation.valid = this.validateOperation(newOperation);
    }

    this.setState({
      activeOperation: newOperation || null,
      activeOperationType: op_type,
      activeResult: null
    });
  }

  setActiveOperationFromParams(params) {
    const { activeOperation, activeOperationType } = this.state;
    if (params && params.action && params.name) {
      // set active query unless it is the current one
      if ((!activeOperation) || params.name !== activeOperation.name || params.action !== activeOperationType) {
        
        let actionList = this.state[params.action];
        
        if (actionList && Array.isArray(actionList)) {
          let operation = actionList.find((d) => (d.name === params.name));
          if (operation) this.setActiveOperation(operation, params.action);
        } else {
          throw new Error('Could not find '+params.name+' in '+params.action);
        }
        
      }
    }
  }


  validateOperation(operation) {

    if (operation.args && Array.isArray(operation.args)) {
      
      for (let i=0;i<operation.args.length;i++) {
        let arg = operation.args[i];
        let required = isOfKind(arg.type, 'NON_NULL');
        let value = arg.value || false;
        let hasValue = (value && typeof(value) === 'string' && value != '');
        let correctDataType = false;
        switch (GetTypeName(arg.type)) {
          case 'Int':
            correctDataType = /^\d+$/.test(value);
            break;
          case 'Float':
            correctDataType = /^(\d*)(\.?)(\d+)$/.test(value);
            break;
          case 'Boolean':
            correctDataType = /^(true|false)$/.test(value);
            break;
          default:
            //probably a string or else something funky
            correctDataType = true;
            break;
        }

        if (required && !hasValue) return false;
        if (hasValue && !correctDataType) return false;
      }
    }

    const validate = (field) => {

      // if not included we're all good
      if (!field.include) return true;

      // else we check for subfields
      let subFields = (field.fields && Array.isArray(field.fields)) ? field.fields : null;
      if (subFields === null || field.fields.length <= 0) return true; // this is not a subfield kind of field. all good

      // if we got 'em we gotta check 'em
      let subsIncluded = find(subFields, (d) => { return (d.include || false); });
      if (typeof(subsIncluded) === 'undefined') return false; // none of the subs are included - now we're mad!

      // we shouldn't be here if there were no included subfields, so lets check 'em!
      for (let i=0; i<subFields.length; i++) {
        if (validate(subFields[i]) === false) return false;
      }

      // we would have returned false if a subfield was invalid - we should be alright
      return true;

    };

    operation.include = true;
    return validate(operation);

  }

  toggleField(obj) {

    let shouldInclude = !obj.include;

    if (shouldInclude) {
      if (obj.type && GetTypeName(obj.type)) {
        let tn = GetTypeName(obj.type);
        let typeObj = this.state.types.find((d) => {
          return d.name === tn;
        })
        if (typeObj && typeObj.fields) {
          obj.fields = JSON.parse(JSON.stringify(typeObj.fields)); //cloneDeep(typeObj.fields);
        }
      }
    } else {
      obj.fields = [];
    }

    obj.include = shouldInclude;

    this.state.activeOperation.valid = this.validateOperation(this.state.activeOperation);

    this.forceUpdate();
  }

  updateInput(e) {
    const {
      name,
      value
    } = e.target;
    if (name && (value !== null) && this.state.activeOperation) {
      let operationArgs = this.state.activeOperation && this.state.activeOperation.args;
      let currentArg = operationArgs.find((d) => { return (d.name == name); });
      if (currentArg) {
        currentArg.value = value;
      }
    }

    this.state.activeOperation.valid = this.validateOperation(this.state.activeOperation);
    this.forceUpdate();
  }

  buildQuery(e) {
    e.preventDefault();
    
    const nChar = "\n";
    const tChar = "  ";

    var qString = "";

    let singularTypeList = {
      queries: { lower:'query', upper:'Query' },
      mutations: { lower: 'mutation', upper: 'Mutation' },
      subscriptions: { lower: 'subscription', upper: 'Subscription'}
    };

    let singularType = singularTypeList[this.state.activeOperationType] || {lower:'unknown', upper: 'Unknown'};

    if (this.state.activeOperation && this.state.activeOperation != {}) {
      
      var q = this.state.activeOperation;
      let operationName = GetTypeName(q.type)+singularType.upper;
      
      if (q.name && q.type) {
        
        qString += singularType.lower+" "+operationName;

        qString += " {";
        qString += nChar;

        // Recursive function
        const fieldString = (field, indent, args = null) => {
          
          var theString = "";

          if (field.name && (field.include || field.valid)) {
            
            theString += tChar.repeat(indent);
            theString += field.name;

            var argString = "";
            if (field.args && Array.isArray(field.args) && field.args.length > 0) {

              var argArray = [];
              field.args.map((d,i,a) => {
                let value = d.value || false;
                let hasValue = (value && typeof(value) === 'string' && value != '');
                
                let typeName = GetTypeName(d.type);
                let needQuotes = (typeName === 'String' || typeName === 'ID');
                
                let valueString = needQuotes ? `"${value}"` : `${value}`;

                if (hasValue) {
                  argArray.push(`${d.name}: ${valueString}`);
                }
              });

              if (argArray && argArray.length > 0) {
                argString += "("
                argArray.map((d,i,a) => {
                  argString += d;
                  if (i+1 < a.length) argString += ", ";
                })
                argString += ")";
              }

            }

            theString += argString;
            
            var subString = "";

            if (field.fields && Array.isArray(field.fields)) {
              
              for (let i = 0; i < field.fields.length; i++) {
                let d = field.fields[i];
                subString += fieldString(d, indent+1);
              }
              
            }
            
            if (subString && subString != "") {
              theString += ' {';
              theString += nChar;
              theString += subString;
              theString += tChar.repeat(indent)+'}';
            }

            theString += nChar;

          }

          return theString;
        };
        // End of recursive function

        qString += fieldString(q, 1);
        qString += "}";

      }
    }
    
    this.runOperation(qString);
    
  }

  runOperation(qString) {

    let qOp = {query: qString};

    this.setState({resultLoading: true});

    executeOperation(this.props.fetcher, qOp)
      .then((result) => {
        const { data, errors } = result;
        if (!data || typeof data !== 'object') throw new Error('Result had no data property');
        let resultObj = data;
        if (errors) resultObj = errors;
        this.setState({activeResult: resultObj, resultLoading: false});
      }).catch((error) => {
        this.setState({activeResult: {error}, resultLoading: false});
      });
  }

}

export default InquirerEditor;

