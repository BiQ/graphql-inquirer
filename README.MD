# GraphQL Inquirer

A visual data browser for GraphQL APIs.

Demo (**TODO**) pointing to Apollos example API mentioned here:  
https://dev-blog.apollodata.com/4-simple-ways-to-call-a-graphql-api-a6807bcdb355

**Disclaimer:**  
This project is still under development and may not perform as expected. Use at your own risk.

## Use

Install via NPM (**TODO**)

`$ npm install graphql-inquirer`

Set up a fetcher function. It must point to a valid introspectable GraphQL API, take a query as input and return a Promise.

```javascript
// with Fetch API
function MyFetcher(query) {

  var request_options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  }

  return fetch('url://to.your.api', request_options).then((response) => (response.json()));
}
```

Import and render with React

```javascript
import React from 'react';
import ReactDOM from 'react-dom'

import GraphQLInquirer from 'graphql-inquirer';

ReactDOM.render(<GraphQLInquirer fetcher={MyFetcher} />, document.getElementById('my-root-component'));
```

## Development

1. Clone or fork the repository and run `$ npm install`

1. Run `$ npm run serve` to start Webpack Dev Server

1. Do your thing

1. Run `$ npm run build` to build the project