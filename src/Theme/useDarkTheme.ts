import {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import StorageKeys from '../Config/StorageKeys';
import Storage from '../Services/storage-service';

export default function useDarkTheme() {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  useEffect(() => {
    checkSavedTheme();
  }, [isDarkMode]);

  async function checkSavedTheme() {
    const theme = await Storage.getItem(StorageKeys.userTheme);
    setIsDarkMode(theme === 'dark');
    // setIsDarkMode(true);
  }

  return isDarkMode;
}
