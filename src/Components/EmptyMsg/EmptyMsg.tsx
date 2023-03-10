import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './EmptyMsg.style';

type MyProps = {
  msg: String;
};

export default function EmptyMsg({msg}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{msg}</Text>
    </View>
  );
}
