import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './ConfiromCode.style';
import I18n from '../../../translate';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import {MyButton, MyInput} from '../../../Components/Native';
import {post} from '../../../Services/api-service';
import {connect} from 'react-redux';
import {setTokenAction} from '../../../Redux/Actions/auth.action';
import {errorHandler} from '../../../Services/toast-service';
import {AxiosError} from 'axios';

type MyProps = {
  navigation: {
    navigate: Function;
    replace: Function;
    goBack: Function;
  };
  route: {
    params: {
      email: String;
    };
  };
  setTokenAction: Function;
};

function ConfirmCode(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);

  function backToLogin() {
    props.navigation.replace('Login');
  }

  function submit() {
    setLoading(true);
    const url = '/user/verifyCode';
    const body = {
      email: props.route?.params?.email,
      code,
    };
    post(url, body, false)
      .then(({data}) => {
        console.log('Data : ', data);
        props.setTokenAction(data?.token);
        props.navigation.navigate('ResetPassword', {
          token: data?.token,
        });
      })
      .catch((err: AxiosError) => {
        console.log('Err : ', err);
        const msg = err?.response?.data?.message;
        errorHandler(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function goBack() {
    props.navigation.goBack();
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
          label={I18n.ConfirmCode.enterCode}
          placeholder={I18n.ConfirmCode.enterCode}
          onChange={setCode}
          style={styles.input}
          keyboardType={'decimal-pad'}
        />
        <MyButton
          style={styles.btn}
          label={I18n.ConfirmCode.verify}
          disabled={!code}
          action={submit}
          processing={loading}
        />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {setTokenAction})(ConfirmCode);
