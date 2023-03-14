import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, ImageBackground} from 'react-native';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import MyInput from '../../../Components/Native/MyInput/MyInput';
import MyButton from '../../../Components/Native/MyButton/MyButton';
import I18n from '../../../translate';
import {
  googleConfigure,
  googleLogin,
  GoogleSigninBtn,
} from '../../../Services/social-service';

type MyProps = {
  navigation: {
    navigate: Function;
    replace: Function;
  };
};

const Login = (props: MyProps) => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    googleConfigure();
  }, []);

  function submit() {
    console.log('caleed : ' + password + username);
    setLoading(true);
    setTimeout(() => {
      props.navigation.replace('Tabs');
      // console.log('Props : ', props);
      setLoading(false);
    }, 1000);
  }

  function goToSignUp() {
    props.navigation.navigate('Register');
  }
  function goToForgotPW() {
    props.navigation.navigate('ForgotPassword');
  }

  function signin() {
    googleLogin()
      .then(user => {
        console.log('U : ', user);
      })
      .catch(err => {
        console.log('G ERR : ', err);
      });
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
            label={I18n.SignIn.username}
            placeholder={I18n.SignIn.enterUsername}
            type="text"
            onChange={setUsername}
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
            action={submit}
            processing={loading}
          />
        </View>
        <GoogleSigninBtn action={signin} />
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;
