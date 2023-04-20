import React, {memo, useState} from 'react';
import {ImageBackground, ScrollView, View, Text} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './JoinQuiz.style';
import I18n from '../../../translate';
import Header from '../../../Components/Header/Header';
import {MyButton, MyInput} from '../../../Components/Native';
import {connect} from 'react-redux';
import ReduxState from '../../../Models/ReduxState';
import User from '../../../Models/User.model';
import {get} from '../../../Services/api-service';
import {errorHandler} from '../../../Services/toast-service';
import {setTokenAction} from '../../../Redux/Actions/auth.action';

type MyProps = {
  navigation: {
    goBack: Function;
    navigate: Function;
  };
  user: User;
  setTokenAction: Function;
};

function JoinQuiz({navigation}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);

  function goBack() {
    navigation.goBack();
  }

  async function submit() {
    const url = `/quiz/join/${code}`;
    setLoading(true);
    get(url)
      .then(({data}) => {
        navigation.navigate('QuizIntro', {
          quiz: data,
        });
      })
      .catch(err => {
        console.log('Join Quiz Err : ', err);
        errorHandler('wrongeCode');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <Header goBack={goBack} label={I18n.Screens.joinQuiz} />
        <View style={styles.content}>
          <Text style={styles.msg}>{I18n.JoinQuiz.msg}</Text>
          <MyInput
            placeholder={I18n.JoinQuiz.enterCode}
            value={code}
            onChange={setCode}
            style={styles.input}
          />

          <View style={styles.btnCont}>
            <MyButton
              action={submit}
              processing={loading}
              style={styles.btn}
              label={I18n.JoinQuiz.join}
              disabled={!code}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {setTokenAction})(memo(JoinQuiz));
