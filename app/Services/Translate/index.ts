import I18n from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import AsyncStorage from '@react-native-async-storage/async-storage';

I18n.fallbacks = true;
I18n.locale = 'ar'

I18n.translations = {
  ar,
  en,
};

let activeLang = 'ar';

// let defineLang = async () => {
//   await AsyncStorage.getItem('locale').then(locale => {
//     I18n.locale = locale || 'en-US';
//     if (locale === 'ar-EG') {
//       activeLang = 'ar';
//     } else {
//       activeLang = 'en';
//     }
//   });
// };

export const setActiveLang = (lang: string) => {
  activeLang = lang;
};

export const toggleActiveLang = () => {
  let newLang = activeLang === 'ar' ? 'en' : 'ar';
  let locale = newLang === 'ar' ? 'ar-EG' : 'en-US';
  activeLang = newLang;
  I18n.locale = locale;
  AsyncStorage.setItem('locale', locale);
};

export const getActiveLang = () => {
  // console.log('active lang : ', activeLang);
  return activeLang;
};

// getLanguages().then(langs => {});

export default I18n;
