import React, {useState} from 'react';
import {ScrollView, View, Text, ImageBackground} from 'react-native';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import MyInput from '../../../Components/Native/MyInput/MyInput';
import MyButton from '../../../Components/Native/MyButton/MyButton';
import I18n from '../../../translate';
import {googleLogin, GoogleSigninBtn} from '../../../Services/social-service';
import {post} from '../../../Services/api-service';
import {User as GoogleUser} from '@react-native-google-signin/google-signin';
import {AxiosError} from 'axios';
import {errorHandler, showError} from '../../../Services/toast-service';
import {loginAction} from '../../../Redux/Actions/auth.action';
import {connect} from 'react-redux';
import Storage from '../../../Services/storage-service';
import StorageKeys from '../../../Config/StorageKeys';
import {emailValidator} from '../../../utils/validator';
import jwtDecode from 'jwt-decode';
import User from '../../../Models/User.model';
import {sendOTP} from '../../../Services/globalAPI-service';

type MyProps = {
  navigation: {
    navigate: Function;
    replace: Function;
  };
  loginAction: Function;
};

const Login = (props: MyProps) => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   googleConfigure();
  // }, []);

  function signin() {
    if (!emailValidator(email)) {
      showError(I18n.ErrorMessage.invalidEmail);
    } else {
      const url = '/user/login';

      const body = {
        email,
        password,
      };
      setLoading(true);
      post(url, body, false)
        .then(({data}) => {
          Storage.setItem(StorageKeys.userToken, data);
          props.loginAction(data);
          handleLoginSuccess(data);
        })
        .catch((err: AxiosError) => {
          const msg = err.response?.data?.message;
          errorHandler(msg);
          console.log('Err Log: ', err, err.response);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function goToSignUp() {
    props.navigation.navigate('Register');
  }
  function goToForgotPW() {
    props.navigation.navigate('ForgotPassword');
  }

  function socialSignin() {
    googleLogin()
      .then(({user}: GoogleUser) => {
        const url = '/user/login';
        const body = {
          email: user?.email,
          socialID: user?.id,
          photo: user?.photo,
          name: user?.name,
        };
        setLoading(true);
        post(url, body)
          .then(({data}) => {
            Storage.setItem(StorageKeys.userToken, data);
            props.loginAction(data);
            props.navigation.replace('Tabs');
          })
          .catch((err: AxiosError) => {
            const msg = err.response?.data?.message;
            errorHandler(msg);
            console.log('Err : ', err, err.response);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(err => {
        console.log('G ERR : ', err);
      });
  }

  function handleLoginSuccess(token: string) {
    let userData: User = jwtDecode(token);
    console.log('userData : ', userData);
    if (userData.verified) {
      props.navigation.replace('Tabs');
    } else {
      sendOTP();
      props.navigation.navigate('OTP', {
        email: userData.email,
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <AuthHead
          link={I18n.SignIn.reg}
          message={I18n.SignIn.noAccount}
          screenName={I18n.SignIn.ScreenName}
          linkAction={goToSignUp}
        />
        <View style={styles.formCont}>
          <MyInput
            label={I18n.SignIn.email}
            placeholder={I18n.SignIn.enterEmail}
            type="text"
            onChange={setEmail}
            keyboardType="email-address"
          />
          <MyInput
            label={I18n.SignIn.password}
            placeholder={I18n.SignIn.enterPassword}
            secured={true}
            onChange={setPassword}
          />
          <Text style={styles.text} onPress={goToForgotPW}>
            {I18n.SignIn.forgotPassword}
          </Text>
          <MyButton
            label={I18n.SignIn.login}
            action={signin}
            processing={loading}
          />
        </View>
        <GoogleSigninBtn action={socialSignin} />
      </ImageBackground>
    </ScrollView>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, {loginAction})(Login);
