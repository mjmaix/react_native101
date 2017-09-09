import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

class SignUpForm extends Component {
  state = { phone: '', message: '' };

  handleSubmit = async () => {
    this.setState({ message: 'Creating user...' });
    try {
      await axios.post(`${this.props.rootUrl}/createUser`, { phone: this.state.phone });
      await axios.post(`${this.props.rootUrl}/requestOneTimePassword`, { phone: this.state.phone });
      this.setState({ message: 'Create user success\nWait for OTP' });
    } catch({ response }) {
      console.log(response.data);
      this.setState({ message: response.data.message });
    }
  }

  render() {
    return (
      <View>
        <Text>Sign Up</Text>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
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

export default SignUpForm;
