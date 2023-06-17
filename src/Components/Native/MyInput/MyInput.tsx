import React, {forwardRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './styles';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

type MyProps = TextInputProps & {
  label: String;
  secured: Boolean;
  onChange: Function;
  keyboardType: KeyboardTypeOptions;
  value?: String;
};

export default forwardRef(function MyInput(props: MyProps, ref) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [secured, setSecured] = useState(props.secured);

  return (
    <KeyboardAvoidingView style={[styles.container, props.style]}>
      {props?.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.inputCont}>
        <TextInput
          {...props}
          placeholder={props.placeholder}
          style={[styles.input, props.style]}
          secureTextEntry={secured}
          onChangeText={t => props.onChange(t)}
          placeholderTextColor={colors.placeholder}
          keyboardType={props.keyboardType}
          ref={ref}
          value={props?.value}
        />
        {props.secured && (
          <Icon
            style={styles.icon}
            size="xl"
            name={secured ? 'eye' : 'eye-with-line'}
            as={Entypo}
            onPress={() => setSecured(!secured)}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
});
