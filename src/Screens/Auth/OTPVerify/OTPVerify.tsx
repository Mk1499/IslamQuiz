import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../../Components/Header/Header';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './OTPVerify.styles';
import MyInput from '../../../Components/Native/MyInput/MyInput';
import CountDown from 'react-native-countdown-component';
import I18n from '../../../translate';
import {MyButton} from '../../../Components/Native';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
};

export default function OTPVerify(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [showResend, setShowResend] = useState(false);
  const [counter, setCounter] = useState(10);
  const [code, setCode] = useState();

  function resendCode() {
    setCounter(10);
    setShowResend(false);
  }

  function submit() {
    console.log('Code : ', code);
  }

  return (
    <ScrollView style={styles.container}>
      <Header label={I18n.Screens.verify} goBack={props.navigation.goBack} />
      <View style={styles.content}>
        <Text style={styles.msg}>{I18n.OTP.pleaseCheck}</Text>
        <Text style={styles.bold}>m@mail</Text>
      </View>
      <MyInput
        style={styles.input}
        keyboardType={'decimal-pad'}
        placeholder={I18n.OTP.enterCode}
        onChange={c => setCode(c)}
      />
      <View>
        <Text style={[styles.text, styles.resendMsg]}>
          {I18n.OTP.resndeAfter}
        </Text>

        {showResend ? (
          <Text style={[styles.text, styles.resend]} onPress={resendCode}>
            {I18n.OTP.resend}
          </Text>
        ) : (
          <CountDown
            timeToShow={['M', 'S']}
            digitTxtStyle={styles.digitText}
            digitStyle={styles.digit}
            until={counter}
            timeLabels={{
              m: '',
              s: '',
            }}
            style={styles.timer}
            onFinish={() => setShowResend(true)}
          />
        )}
      </View>
      <View style={styles.btnCont}>
        <MyButton
          label={I18n.OTP.verify}
          action={submit}
          disabled={!code || code.length < 6}
        />
      </View>
    </ScrollView>
  );
}
