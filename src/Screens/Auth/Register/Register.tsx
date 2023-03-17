import React, {useState} from 'react';
import {ScrollView, View, ImageBackground} from 'react-native';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import MyInput from '../../../Components/Native/MyInput/MyInput';
import MyButton from '../../../Components/Native/MyButton/MyButton';
import I18n from '../../../translate';
import {errorHandler, showError} from '../../../Services/toast-service';
import {post} from '../../../Services/api-service';
import {connect} from 'react-redux';
import {setTokenAction} from '../../../Redux/Actions/auth.action';
import {emailValidator} from '../../../utils/validator';
import Storage from '../../../Services/storage-service';
import StorageKeys from '../../../Config/StorageKeys';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack();
    replace: Function;
  };
  setTokenAction: Function;
};

const Register = (props: MyProps) => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  function checkFormValid() {
    return username && password && password2 && email;
  }

  function submit() {
    const url = '/user/register';

    const body = {
      name: username,
      password,
      email,
    };
    if (password !== password2) {
      showError(I18n.ErrorMessage.twoPassSame);
    } else if (!emailValidator(email)) {
      showError(I18n.ErrorMessage.invalidEmail);
    } else {
      setLoading(true);
      post(url, body, false)
        .then(({data}) => {
          Storage.setItem(StorageKeys.userToken, data);
          props.setTokenAction(data);
          props.navigation.navigate('OTP', {
            email,
          });
        })
        .catch((err: AxiosError) => {
          const msg = err.response?.data?.message;
          errorHandler(msg);
          console.log('Err : ', err, err.response);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function goToSignUp() {
    props.navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <AuthHead
          link={I18n.SignUp.login}
          message={I18n.SignUp.haveAccount}
          screenName={I18n.SignUp.ScreenName}
          linkAction={goToSignUp}
        />
        <View style={styles.formCont}>
          <MyInput
            label={I18n.SignUp.username}
            placeholder={I18n.SignUp.enterUsername}
            type="text"
            onChange={setUsername}
          />
          <MyInput
            label={I18n.SignUp.email}
            placeholder={I18n.SignUp.enterEmail}
            type="email"
            onChange={setEmail}
            keyboardType="email-address"
          />
          <MyInput
            label={I18n.SignUp.password}
            placeholder={I18n.SignUp.enterPassword}
            secured={true}
            onChange={setPassword}
          />
          <MyInput
            label={I18n.SignUp.confirmPassword}
            placeholder={I18n.SignUp.enterConfirmPassword}
            secured={true}
            onChange={setPassword2}
          />
          <MyButton
            label={I18n.SignUp.reg}
            action={submit}
            processing={loading}
            disabled={!checkFormValid()}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {setTokenAction})(Register);
