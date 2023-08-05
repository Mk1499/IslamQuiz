import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './ResetPassword.styles';
import I18n from '../../../translate';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import {MyButton, MyInput} from '../../../Components/Native';
import {
  errorHandler,
  showError,
  showSuccess,
} from '../../../Services/toast-service';
import {post} from '../../../Services/api-service';

type MyProps = {
  navigation: {
    navigate: Function;
    replace: Function;
    goBack: Function;
  };
  route: {
    params: {
      token: String;
    };
  };
};

export default function ResetPassword(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  function backToLogin() {
    props.navigation.replace('Login');
  }

  function goBack() {
    props.navigation.goBack();
  }

  function submit() {
    if (confirmPassword === password) {
      reset();
    } else {
      const msg = I18n.ErrorMessage.twoPassSame;
      showError(msg);
    }
  }

  function reset() {
    const url = '/user/resetPassword';
    const body = {
      newPassword: password,
    };
    const token = props.route?.params?.token;
    setLoading(true);
    post(url, body, true, token)
      .then(() => {
        showSuccess(I18n.SuccessMsg.passwordChanged);
        props.navigation.replace('Login');
      })
      .catch(err => {
        console.log('change Err : ', err);
        errorHandler();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ScrollView style={styles.container} keyboardDismissMode="interactive">
      <AuthHead
        link={I18n.ForgotPassword.login}
        message={I18n.ForgotPassword.haveAccount}
        screenName={I18n.ForgotPassword.ScreenName}
        linkAction={backToLogin}
        goBack={goBack}
      />
      <View style={styles.content}>
        <MyInput
          label={I18n.ResetPassword.newPassword}
          placeholder={I18n.ResetPassword.enterPassword}
          secured={true}
          onChange={setPassword}
          style={styles.input}
        />
        <MyInput
          label={I18n.ResetPassword.confirmPassword}
          placeholder={I18n.ResetPassword.enterPassword}
          secured={true}
          onChange={setConfirmPassword}
          style={styles.input}
        />
        <MyButton
          style={styles.btn}
          label={I18n.ResetPassword.change}
          disabled={!password || !confirmPassword}
          action={submit}
          processing={loading}
        />
      </View>
    </ScrollView>
  );
}
