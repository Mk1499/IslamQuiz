import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import makeStyle from './styles';
import {useTheme} from '../../Theme/ThemeProvider';
import I18n, {getActiveLang, setActiveLang} from '../../translate';
// import bgImg from '../../../assets/images/BGpattern.png';

type MyProps = {
  screenName: string;
  message: string;
  link: string;
  linkAction: Function;
};

const AuthHead = (props: MyProps) => {
  const {dark, setScheme, setLangUpdated, setRTL} = useTheme();
  const styles = makeStyle();
  const toggleScheme = () => {
    if (dark) {
      setScheme('light');
    } else {
      setScheme('dark');
    }
  };

  const toggleLang = () => {
    const currentLang = getActiveLang();
    if (currentLang === 'en') {
      setActiveLang('ar');
      setRTL(true);
    } else {
      setActiveLang('en');
      setRTL(false);
    }
    setLangUpdated(true);
  };

  return (
    <>
      <ImageBackground
        source={require('../../../assets/images/BGpattern.png')}
        style={[styles.bgCont, styles.container]}>
        <View style={styles.brandCont}>
          <Text style={styles.brand}>{I18n.Global.appName}</Text>
          <Text style={styles.otherLang} onPress={toggleLang}>
            {I18n.Global.otherLang}
          </Text>
        </View>
        <View style={styles.dataCont}>
          <Text style={styles.title} onPress={toggleScheme}>
            {props.screenName}
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>{props.message}</Text>
            <Text style={[styles.text, styles.link]} onPress={props.linkAction}>
              {props.link}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <ImageBackground
        source={require('../../../assets/images/BGpattern.png')}
        style={[styles.bgCont, styles.firstExtend]}
      />
      <ImageBackground
        source={require('../../../assets/images/BGpattern.png')}
        style={[styles.bgCont, styles.secExtent]}
      />
    </>
  );
};

export default AuthHead;