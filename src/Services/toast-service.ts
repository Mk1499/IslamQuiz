import Toast from 'react-native-toast-message';

export function showError(msg: string) {
  Toast.show({
    type: 'error',
    text1: msg,
    // text2: msg,
    position: 'bottom',
  });
}
