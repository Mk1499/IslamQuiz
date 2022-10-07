// import I18n, {getLanguages} from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LocalizedStrings from 'react-native-localization';
import StorageKeys from '../Config/StorageKeys';

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
  // let locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  activeLang = lang;
  // I18n.locale = locale;
  strings.setLanguage(lang);
  // if (locale === 'ar-EG') {
  //   I18nManager.forceRTL(true);
  // }
  AsyncStorage.setItem(StorageKeys.userLang, lang);
};

export const getActiveLang = () => {
  return activeLang;
};

// getLanguages().then(() => {
//   // console.log('Langs : ', langs);
// });

export default strings;
