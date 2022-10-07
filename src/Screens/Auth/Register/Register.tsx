import React, {useState} from 'react';
import {ScrollView, View, ImageBackground} from 'react-native';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import MyInput from '../../../Components/MyInput/MyInput';
import MyButton from '../../../Components/MyButton/MyButton';
import I18n from '../../../translate';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack();
  };
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

  function submit() {
    console.log('caleed : ', password, username, email, password2);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Register;
