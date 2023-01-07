import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import {getActiveLang, setActiveLang} from '../../translate';
import makeStyle from './LangSwitch.style';

export default function LangSwitch() {
  const {colors, setRTL, setLangUpdated} = useTheme();
  const styles = makeStyle(colors);

  const toggleLang = () => {
    const lang = getActiveLang();
    if (lang === 'en') {
      setActiveLang('ar');
      // setLang('ar');
      setRTL(true);
    } else {
      setActiveLang('en');
      // setLang('en');
      setRTL(false);
    }
    setLangUpdated(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleLang}>
      <View
        style={
          getActiveLang() === 'ar' ? styles.activeCont : styles.normalCont
        }>
        <Text
          style={getActiveLang() === 'ar' ? styles.activeText : styles.text}>
          ع
        </Text>
      </View>
      <View
        style={
          getActiveLang() === 'en' ? styles.activeCont : styles.normalCont
        }>
        <Text
          style={getActiveLang() === 'en' ? styles.activeText : styles.text}>
          EN
        </Text>
      </View>
    </TouchableOpacity>
  );
}
