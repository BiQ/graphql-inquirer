import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import { BrowserRouter } from 'react-router-dom';

import { fetchSchema } from './Utility/fetcher.js';

import App from './App';

class GraphQLInquirer {
  
  constructor(selector, endpoint) {

    this.selector = selector;
    this.endpoint = endpoint;

    console.log('GraphQLInquirer was born!');

  }

  render() {

    let stage = document.querySelector(this.selector);
    
    /*
    fetchSchema(this.endpoint).then((result) => {
      ReactDOM.render(<App data={result} />, stage);
    });
    */

    ReactDOM.render(<AppWrapper endpoint={this.endpoint} />, stage);

    //stage.innerHTML = 'We put something in stage';

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
    console.log('spoing');
    fetchSchema(this.endpoint).then((result) => {
      console.log(result);
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