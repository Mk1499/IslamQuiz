import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './header.styles';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getActiveLang} from '../../translate';

type MyProps = {
  label: String;
  goBack: Function;
};

function Header(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      <Icon
        as={AntDesign}
        size="xl"
        style={styles.icon}
        name={getActiveLang() === 'ar' ? 'left' : 'right'}
        onPress={() => props.goBack()}
      />
      <Text style={styles.text}>{props.label}</Text>
    </View>
  );
}

export default memo(Header);
