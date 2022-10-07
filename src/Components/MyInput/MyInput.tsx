import React from 'react';
import {KeyboardAvoidingView, Text, TextInput} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './styles';

type MyProps = {
  label: String;
  placeholder: String;
  secured: Boolean;
  onChange: Function;
};

export default function MyInput(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        secureTextEntry={props.secured ? true : false}
        onChangeText={t => props.onChange(t)}
        placeholderTextColor={colors.placeholder}
      />
    </KeyboardAvoidingView>
  );
}
