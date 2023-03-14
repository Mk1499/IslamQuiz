import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import NavigationService from '../Routes/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKeys from '../Config/StorageKeys';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    messaging()
      .getToken()
      .then((token: string) => {
        console.log('FBToken : ', token);
      })
      .catch(err => {
        console.log('Get Token Err: ', err);
      });
  }
}

export const noteClickedHandler = (data: any) => {
  return new Promise(resolve => {
    if (data.navigation) {
      NavigationService.navigate(data.screenName, JSON.parse(data.params));
    }
    resolve(true);
  });
};

export const configureAndroidPushNote = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (data) {
      AsyncStorage.setItem('DeviceToken', data.token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: async function (notification) {
      console.log('NOTIFICATION:', notification);
      if (notification.userInteraction) {
        AsyncStorage.setItem(
          StorageKeys.NoteOpenApp,
          JSON.stringify(notification),
        );
        // notification.finish(noteClickedHandler(notification.data));
        await noteClickedHandler(notification.data);
      }

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
};
