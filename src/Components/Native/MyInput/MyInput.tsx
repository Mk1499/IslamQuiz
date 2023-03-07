import React, {forwardRef} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Text,
  TextInput,
} from 'react-native';
import {StyleProps} from 'react-native-reanimated';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './styles';

type MyProps = {
  label: String;
  placeholder: String;
  secured: Boolean;
  onChange: Function;
  keyboardType: KeyboardTypeOptions;
  style: StyleProps;
};

export default forwardRef(function MyInput(props: MyProps, ref) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <KeyboardAvoidingView style={[styles.container, props.style]}>
      {props?.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        secureTextEntry={props.secured ? true : false}
        onChangeText={t => props.onChange(t)}
        placeholderTextColor={colors.placeholder}
        keyboardType={props.keyboardType}
        ref={ref}
      />
    </KeyboardAvoidingView>
  );
});
