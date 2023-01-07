import React, {useState} from 'react';
import {ScrollView, View, ImageBackground} from 'react-native';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import MyInput from '../../../Components/Native/MyInput/MyInput';
import MyButton from '../../../Components/Native/MyButton/MyButton';
import I18n from '../../../translate';

type MyProps = {
  navigation: {
    goBack: Function;
  };
};

const ForgotPassword = (props: MyProps) => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function submit() {
    console.log('caleed : ' + email);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function backToLogin() {
    props.navigation.goBack();
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
        />
        <View style={styles.formCont}>
          <MyInput
            label={I18n.ForgotPassword.email}
            placeholder={I18n.ForgotPassword.enterEmail}
            type="email"
            onChange={setEmail}
          />
          <MyButton
            label={I18n.ForgotPassword.sendCode}
            action={submit}
            processing={loading}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ForgotPassword;
