import React, {memo} from 'react';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './ChangeLang.style';
import I18n, {getActiveLang, setActiveLang} from '../../../translate';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../Components/Header/Header';
import {View} from 'react-native';

type MyProps = {
  navigation: {
    goBack: Function;
  };
};

function ChangeLanguage({navigation}: MyProps) {
  const {colors, setRTL, setLangUpdated} = useTheme();

  const styles = makeStyle(colors);

  function goBack() {
    navigation.goBack();
  }

  function toggleLang(lang: String) {
    if (lang === 'ar') {
      setActiveLang('ar');
      setRTL(true);
    } else {
      setActiveLang('en');
      setRTL(false);
    }
    setLangUpdated(true);
  }

  return (
    <ImageBackground
      source={require('../../../../assets/images/BGpattern.png')}
      style={styles.container}>
      <Header goBack={goBack} label={I18n.Screens.changeLang} />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => toggleLang('ar')}
          style={styles.cardCont}>
          <Text style={styles.label}>{I18n.ChangeLanguage.ar}</Text>
          {getActiveLang() === 'ar' && (
            <Icon
              size="lg"
              name="checkcircle"
              as={AntDesign}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleLang('en')}
          style={styles.cardCont}>
          <Text style={styles.label}>{I18n.ChangeLanguage.en}</Text>
          {getActiveLang() === 'en' && (
            <Icon
              size="lg"
              name="checkcircle"
              as={AntDesign}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default memo(ChangeLanguage);
