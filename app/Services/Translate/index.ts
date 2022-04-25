import I18n from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import AsyncStorage from '@react-native-async-storage/async-storage';

I18n.fallbacks = true;
I18n.locale = 'ar';

I18n.translations = {
  ar,
  en,
};

let activeLang = 'ar';

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
  return activeLang;
};

export default I18n;
