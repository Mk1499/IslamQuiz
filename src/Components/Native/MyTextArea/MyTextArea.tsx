import React, {forwardRef} from 'react';
import {KeyboardAvoidingView, KeyboardTypeOptions} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './styles';
import {TextArea} from 'native-base';

type MyProps = {
  label: String;
  placeholder: String;
  secured: Boolean;
  onChange: Function;
  keyboardType: KeyboardTypeOptions;
};

export default forwardRef(function MyTextArea(props: MyProps, ref) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        secureTextEntry={props.secured ? true : false}
        onChangeText={t => props.onChange(t)}
        placeholderTextColor={colors.placeholder}
        keyboardType={props.keyboardType}
      /> */}
      <TextArea
        placeholder={props.placeholder}
        style={styles.input}
        onChangeText={t => props.onChange(t)}
        placeholderTextColor={colors.placeholder}
        keyboardType={props.keyboardType}
        numberOfLines={4}
        borderWidth={0}
        marginY={2}
        ref={ref}
      />
    </KeyboardAvoidingView>
  );
});
