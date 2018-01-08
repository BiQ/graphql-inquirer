# GraphQL Inquirer

A visual data browser for GraphQL APIs.

Demo (**TODO**)

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

Clone or fork the repository and run `$ npm install`

Run `$ npm run serve` to start Webpack Dev Server

Develop to your heart's content

Run `$ npm run build` to build the project