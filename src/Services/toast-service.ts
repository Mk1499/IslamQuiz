import Toast from 'react-native-toast-message';
import I18n from '../translate';

export function showError(msg: string) {
  Toast.show({
    type: 'error',
    text1: msg,
    // text2: msg,
    position: 'bottom',
  });
}

export function showSuccess(msg: string) {
  Toast.show({
    type: 'success',
    text1: msg,
    // text2: msg,
    position: 'bottom',
  });
}

export function errorHandler(msg: string) {
  switch (msg) {
    case 'NoUser':
      showError(I18n.ErrorMessage.noUser);
      break;
    default:
      showError(I18n.ErrorMessage.somethingWrong);
      break;
  }
}
