import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { EXPO_PUSH_ENDPOINT } from 'react-native-dotenv';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log('previousToken', previousToken);

  if (previousToken) {
    return;
  } else {
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    
    if(status !== 'granted') {
      return;
    }

    try {
      let token = await Notifications.getExpoPushTokenAsync();
      await axios.post(EXPO_PUSH_ENDPOINT, { token: { token }});
      AsyncStorage.setItem('pushtoken', token);
    } catch (e) {
      console.error(e);
    }
  }
}
