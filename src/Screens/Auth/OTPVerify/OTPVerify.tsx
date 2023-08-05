import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../../Components/Header/Header';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './OTPVerify.styles';
import MyInput from '../../../Components/Native/MyInput/MyInput';
import CountDown from 'react-native-countdown-component';
import I18n from '../../../translate';
import {MyButton} from '../../../Components/Native';
import {post} from '../../../Services/api-service';
import {showError} from '../../../Services/toast-service';
import {sendOTP} from '../../../Services/globalAPI-service';

type MyProps = {
  navigation: {
    replace: Function;
    goBack: Function;
  };
  route: {
    params: {
      email: String;
    };
  };
};

export default function OTPVerify(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [showResend, setShowResend] = useState(false);
  const [counter, setCounter] = useState(30);
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);

  const email = props.route?.params?.email;

  function resendCode() {
    setCounter(30);
    setShowResend(false);
    sendOTP();
  }

  function submit() {
    const url = '/user/verifyEmail';
    const body = {
      code,
    };
    setLoading(true);
    post(url, body)
      .then(({data}) => {
        // console.log('Data : ', data);
        props.navigation.replace('Tabs');
      })
      .catch(err => {
        console.log('Code Err : ', err);
        showError(I18n.ErrorMessage.wrongCode);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ScrollView style={styles.container}>
      <Header label={I18n.Screens.verify} goBack={props.navigation.goBack} />
      <View style={styles.content}>
        <Text style={styles.msg}>{I18n.OTP.pleaseCheck}</Text>
        <Text style={styles.bold}>{email}</Text>
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
          processing={loading}
        />
      </View>
    </ScrollView>
  );
}
