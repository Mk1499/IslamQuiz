import React, {memo} from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {StyleProps} from 'react-native-reanimated';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './styles';

type MyProps = {
  label: String;
  action: Function;
  processing: Boolean;
  disabled?: Boolean;
  style?: StyleProps;
  light?: Boolean;
};

function MyButton(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.light ? styles.emptyCont : styles.filledCont,
        {
          opacity: props.disabled ? 0.5 : 1,
        },
        props.style,
      ]}
      onPress={() => props.action()}
      disabled={props.disabled || props.processing}>
      {props.processing ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : (
        <Text style={props.light ? styles.emptyLabel : styles.label}>
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default memo(MyButton);
