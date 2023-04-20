import {post} from './api-service';
import messaging from '@react-native-firebase/messaging';

export const updateUserDevicetoken = async () => {
  const url = '/user/setDeviceToken';
  const deviceToken = await messaging().getToken();
  const body = {deviceToken};
  post(url, body, true)
    .then(({data}) => {
      console.log('DEvice Token res : ', data);
    })
    .catch(err => {
      console.log('Device Token Err : ', err);
    });
};
