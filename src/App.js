import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import HomePage from './Component/HomePage';
import { Auth0Provider } from "@auth0/auth0-react";

class App extends Component {
  render() {
   
    return (
      <>
       <Auth0Provider
    domain="dev-neb5nzry24iijaw0.us.auth0.com"
    clientId="stCZ8bBkCjYqpcyifn5D2oLcVZGTEFnu"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <div className="App">
    </div>
      <Provider store={store}>
        <HomePage />
      </Provider>
      </Auth0Provider>
      </>
    );
  }
}

export default App;



