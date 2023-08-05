import React, {useState} from 'react';
import {ScrollView, View, ImageBackground} from 'react-native';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import MyInput from '../../../Components/Native/MyInput/MyInput';
import MyButton from '../../../Components/Native/MyButton/MyButton';
import I18n from '../../../translate';
import {post} from '../../../Services/api-service';
import {errorHandler, showError} from '../../../Services/toast-service';
import {AxiosError} from 'axios';
import {emailValidator} from '../../../utils/validator';

type MyProps = {
  navigation: {
    goBack: Function;
    navigate: Function;
    replace: Function;
  };
};

const ForgotPassword = (props: MyProps) => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function callAPI() {
    const url = '/user/forgotPassword';
    const body = {
      email,
    };
    setLoading(true);
    post(url, body, false)
      .then(({data}) => {
        // console.log('Data : ', data);
        gotoOTP();
      })
      .catch((err: AxiosError) => {
        console.log('Err : ', err);
        if (err.code === 500) {
          errorHandler();
        } else {
          gotoOTP();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function submit() {
    if (emailValidator(email)) {
      callAPI();
    } else {
      showError(I18n.ErrorMessage.invalidEmail);
    }
  }

  function backToLogin() {
    props.navigation.replace('Login');
  }

  function goBack() {
    props.navigation.goBack();
  }

  function gotoOTP() {
    props.navigation.navigate('ConfirmCode', {
      email,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <AuthHead
          link={I18n.ForgotPassword.login}
          message={I18n.ForgotPassword.haveAccount}
          screenName={I18n.ForgotPassword.ScreenName}
          linkAction={backToLogin}
          goBack={goBack}
        />
        <View style={styles.formCont}>
          <MyInput
            label={I18n.ForgotPassword.email}
            placeholder={I18n.ForgotPassword.enterEmail}
            type="email"
            onChange={setEmail}
            keyboardType="email-address"
          />
          <MyButton
            label={I18n.ForgotPassword.sendCode}
            action={submit}
            processing={loading}
            disabled={!email}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ForgotPassword;
