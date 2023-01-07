// import I18n, {getLanguages} from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LocalizedStrings from 'react-native-localization';
import StorageKeys from '../Config/StorageKeys';
import * as moment from 'moment';
// import 'moment/locale/ar';

// I18n.fallbacks = true;

// I18n.translations = {
//   en,
//   ar,
// };

let activeLang = 'en';

let strings = new LocalizedStrings({
  en,
  ar,
});

export const setActiveLang = (lang: string) => {
  activeLang = lang;
  strings.setLanguage(lang);
  AsyncStorage.setItem(StorageKeys.userLang, lang);
  moment.locale(lang);
};

export const getActiveLang = () => {
  return activeLang;
};

export default strings;
