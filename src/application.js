import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';

class GrapQLEnquirer {
  
  constructor(selector, endpoint) {

    this.selector = selector;

    this.client = new ApolloClient({
      link: new HttpLink({ 
        uri: endpoint,/*'https://swapi.co/api/'*/
        headers: { 
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        }
      }),
      cache: new InMemoryCache()
    });

    console.log('GraphQLInquirer was born!');

  }

  render() {

    let stage = document.querySelector(this.selector);

    let ApolloApp = (
      <ApolloProvider client={this.client}>
        <App />
      </ApolloProvider>
    );

    ReactDOM.render(ApolloApp, stage);

    //stage.innerHTML = 'We put something in stage';

  }

}

export default GrapQLEnquirer;