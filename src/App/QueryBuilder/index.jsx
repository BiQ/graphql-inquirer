import React from 'react';

import { 
  RecursiveTypeString,
  GetTypeName
} from '../../Utility/utility.jsx';

import QueryFieldset from './query_fieldset.jsx';

const QueryBuilder = (props) => {

  console.log('props', props)
  const {
    match,

    loading,
    types,
    queries
  } = props;

  console.log('queries', queries)
  
  if (loading) {
    return <div>Loading...</div>
  }

  let query = queries.find((d) => (d.name == match.params.name));

  if (!query) {
    throw new Error('The query couldn\'t be found! '+match.params.name);
  }

  let argElms = [];
  if (query.args && typeof(query.args) === 'object' && query.args.length > 0) {
    argElms = query.args.map((d,i) => (<QueryArg {...d} key={i} />));
  }

  let typeName = GetTypeName(query.type);
  let type = types.find((t) => (t.name == typeName));

  //let fieldElms = type.fields.map((f,i) => (<QueryField {...f} key={i} />));

  let fields = type.fields;

  console.log(typeName, type.fields);

  return (
    <div className="query-main">
      <h1>Q: {query.name}</h1>
      <h2>{query.description}</h2>
      <p>{typeName}</p>
      <h3>Args</h3>
      <div>
        {argElms}
      </div>
      <h3>Fields</h3>
      <div className="query-body">
        {fields && <QueryFieldset fields={fields} toggle={()=>{console.log('toggled')}} />}
      </div>
      <pre>
        {JSON.stringify(query, null, '  ')}
      </pre>
    </div>
  )

}

export default QueryBuilder;

const QueryArg = (props) => {

  const {
    name,
    description,
    type,
    defaultValue
  } = props;

  return (
    <div>{name} - {description}: { RecursiveTypeString(type) }</div>
  );

};

const QueryField = (props) => {

  const {
    args,
    deprecationReason,
    description,
    isDeprecated,
    name,
    type
  } = props;

  return (
    <div>
      {name}: {RecursiveTypeString(type)}
    </div>
  );

};