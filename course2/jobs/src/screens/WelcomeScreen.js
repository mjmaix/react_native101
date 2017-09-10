import _ from 'lodash';
import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  componentDidMount() {
    this.checkLoggedInOnce();
  }

  componentWillReceiveProps() {
    this.checkLoggedInOnce();
  }

  checkLoggedInOnce() {
    this.props.checkLoggedInOnce();
    if (!this.props.showWelcome) {
      this.props.navigation.navigate('auth');
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (this.props.showWelcome) {
      return <AppLoading />;
    }

    // TODO: yes
    return (
      <Slides
        onComplete={this.onSlidesComplete}
        data={SLIDE_DATA}
      />
    );

    // TODO: no - welcome back message
  }
}

function mapStateToProps({ auth }) {
  return { showWelcome: _.isNull(auth.initialAppUse) };
}

export default connect(mapStateToProps, actions)(WelcomeScreen);
