import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import { BrowserRouter } from 'react-router-dom';

import { 
  fetchSchema,
  getSchemaFromUrl
} from './Utility/fetcher.js';

import App from './App';

class GraphQLInquirer {
  
  constructor(selector, endpoint) {

    this.selector = selector;
    this.endpoint = endpoint;

    console.log('GraphQLInquirer was born!');

  }

  render() {

    let stage = document.querySelector(this.selector);

    if (stage) {
      ReactDOM.render(<AppWrapper endpoint={this.endpoint} />, stage);
    } else {
      throw new Error('Couldn\'t mount GraphQL Inquirer. Selector was invalid.');
    }

  }

}

export default GraphQLInquirer;

class AppWrapper extends Component {

  constructor(props) {
    super(props);

    this.endpoint = props.endpoint;

    this.state = {
      loading: true,
      error: false,
      data: null
    };
  }

  componentDidMount() {

/*
    getSchemaFromUrl(this.endpoint).then((result) => {
      console.log('schema from url', result)
      this.setState({
        loading: false,
        error: result.error ? 'An error occured' : false,
        data: result.data || null
      });
    });
*/

    fetchSchema(this.endpoint).then((result) => {
      this.setState({
        loading: false,
        error: result.error ? 'An error occured' : false,
        data: result.data || null
      });
    });
  }

  render() {
    return (<App {...this.state} />);
  }

}