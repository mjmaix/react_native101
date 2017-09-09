import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

class SignInForm extends Component {
  state = { phone: '', code: '', message: '' };

  handleSubmit = async () => {
    this.setState({ message: 'Validating OTP...' });

    const { phone, code } = this.state;
    try {
      let { data } = await axios.post(`${this.props.rootUrl}/verifyOneTimePassword`, {
        phone, code
      });
      
      let user = await firebase.auth().signInWithCustomToken(data.token);
      this.setState({ message: 'Login success, firebase accepted custom JWT token' })
    } catch({ response }) {
      console.log(response.data);
      this.setState({ message: response.data.message });
    }
  }

  render() {
    return (
      <View>
        <Text>Sign In</Text>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>

        <Button
          onPress={this.handleSubmit}
          title="Submit"
        />

        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

export default SignInForm;
