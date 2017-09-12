import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import registerForNotifications from './src/services/push_notifications';
import store from './src/store';
import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [ {text: 'Ok.'} ]
        )
      }
    });
  }

  render() {
    const tabNavOptions = {
        // https://github.com/react-community/react-navigation/issues/1805
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
          labelSize: { fontSize: 12 }
        },
        // tabBarPosition: 'bottom'
    };

    const mainNavOptions = {
      lazy: true,
      navigationOptions: {
        tabBarVisible: false
      }
    }
  
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, tabNavOptions)
      }
    }, mainNavOptions);

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Expo.Constants.statusBarHeight
  }
});
