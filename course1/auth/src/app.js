import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  DB_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID
} from 'react-native-dotenv';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    config = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DB_URL,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true: 
        return <LogoutForm />
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large'/>
    }
  }

  onAuthStateChanged(user) {
    if (user) {
      this.setState({ loggedIn: true })
    } else {
      this.setState({ loggedIn: false })
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
