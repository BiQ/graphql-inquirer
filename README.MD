# GraphQL Inquirer

A visual data browser for GraphQL APIs.

**Disclaimer:**  
This project is still under development and may not perform as expected. Use at your own risk.

## Use

Install via NPM

`$ npm install graphql-inquirer`

**Note**
You must `npm install --save react-router-dom@5.0.0` in the parent project, or manually in this project if you are running the example. This is because `react-router-dom` needs to be a peer dependency to not conflict with the parents installation when using in a routed app. 

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

ReactDOM.render(<GraphQLInquirer fetcher={MyFetcher} />, document.getElementById('my-root-component'))
```

## Using with an existing React Router

If you already have a React Router set up in yout project, just add `isInARouter` as a prop:

```javascript
const RoutedApp = (
  <HashRouter>
    <Route path="/stuff/" component={() =>
      <Inquirer fetcher={MyFetcher} isInARouter />
    } />
  </HashRouter>
)

ReactDOM.render(RoutedApp, document.getElementById('my-root-component'))
```


## Development

1. Clone or fork the repository and run `$ npm install`

1. Run `$ npm run serve` to start Webpack Dev Server

1. Do your thing

1. Run `$ npm run build` to build the project