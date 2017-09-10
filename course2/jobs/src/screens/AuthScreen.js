import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  // NOTE: so that after facebookLogin saved token on redux state,
  // we can check if there is a valid token
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete({ navigation, token }) {
    if(token) {
      navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
