import React, {memo} from 'react';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './ChangeTheme.style';
import I18n from '../../../translate';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../Components/Header/Header';
import {View} from 'react-native';

type MyProps = {
  navigation: {
    goBack: Function;
  };
};

function ChangeTheme({navigation}: MyProps) {
  const {colors, dark, setScheme} = useTheme();

  const styles = makeStyle(colors);

  function goBack() {
    navigation.goBack();
  }

  function change(theme: string) {
    setScheme(theme);
  }

  return (
    <ImageBackground
      source={require('../../../../assets/images/BGpattern.png')}
      style={styles.container}>
      <Header goBack={goBack} label={I18n.Screens.changeTheme} />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => change('dark')}
          style={styles.cardCont}>
          <Text style={styles.label}>{I18n.ChangeTheme.dark}</Text>
          {dark && (
            <Icon
              size="lg"
              name="checkcircle"
              as={AntDesign}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => change('light')}
          style={styles.cardCont}>
          <Text style={styles.label}>{I18n.ChangeTheme.light}</Text>
          {!dark && (
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

export default memo(ChangeTheme);
