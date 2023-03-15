import RNKeyStorage from 'react-native-secure-key-store';

function setItem(key: string, value: any) {
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  return RNKeyStorage.set(key, value, {
    accessible: 'AccessibleWhenUnlockedThisDeviceOnly',
  });
}

function getItem(key: string) {
  return RNKeyStorage.get(key);
}

function removeItem(key: string) {
  return RNKeyStorage.remove(key);
}

export default {
  removeItem,
  getItem,
  setItem,
};
