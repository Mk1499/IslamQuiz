import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './styles';

type MyProps = {
  label: String;
  action: Function;
  processing: Boolean;
};

export default function MyButton(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <TouchableOpacity style={styles.container} onPress={() => props.action()}>
      {props.processing ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.label}>{props.label}</Text>
      )}
    </TouchableOpacity>
  );
}
