import React, {memo} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import makeStyle from './QuizIntro.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import GradientCover from '../../../Components/GradientCover/GradientCover';
import I18n, {getActiveLang} from '../../../translate';
import QuizType from '../../../Models/Quiz.model';
import moment from 'moment';
import MyButton from '../../../Components/Native/MyButton/MyButton';
import Share from 'react-native-share';
import CountDown from 'react-native-countdown-component';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
  route: {
    params: {
      quiz: QuizType;
    };
  };
};

function QuizIntro(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {quiz} = props.route.params;

  const goBack = () => {
    props.navigation.goBack();
  };

  const startQuiz = () => {
    props.navigation.navigate('QuizDetails', {
      quiz,
    });
  };

  const share = () => {
    const message = `please copy this code " ${quiz.code} " to join Quiz on Mutanafeson`;
    Share.open({
      message,
    });
  };

  function getDuration() {
    return getActiveLang() === 'en'
      ? quiz?.duration?.enName
      : quiz?.duration?.arName;
  }

  function checkTakeable() {
    const endDate: Date = quiz.endDate;
    const startDate: Date = quiz.startDate;
    const isFuture = startDate ? moment().diff(startDate, 's') < 0 : false;
    const isExpired = endDate ? moment().diff(endDate, 's') > 0 : false;
    if (!quiz.noOfQuestions) {
      return false;
    } else if (isFuture) {
      console.log('Diff : ', moment().diff(quiz.startDate, 's'));
      return (
        <CountDown
          timeToShow={['D', 'H', 'M', 'S']}
          digitTxtStyle={styles.digitText}
          digitStyle={styles.digit}
          timeLabelStyle={styles.labelStyle}
          until={-1 * moment().diff(quiz.startDate, 's')}
          timeLabels={{
            m: I18n.Timer.minutes,
            s: I18n.Timer.seconds,
            d: I18n.Timer.days,
            h: I18n.Timer.hours,
          }}
          style={styles.timer}
        />
      );
    } else if (isExpired) {
      return <Text style={styles.expireMsg}>{I18n.Quiz.isExpired}</Text>;
    } else {
      return <MyButton label={I18n.Quiz.start} action={startQuiz} />;
    }
  }

  return (
    <ImageBackground
      source={require('../../../../assets/images/BGpattern.png')}
      style={styles.content}>
      <ScrollView style={styles.container}>
        <GradientCover
          onBack={goBack}
          coverURL={quiz.cover}
          title={quiz.name}
          description={quiz.description}
          onShare={share}
        />
        <View style={styles.metaDateCont}>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.noOfQuestions} : </Text>
            <Text style={styles.value}>{quiz.noOfQuestions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.noOfSubmissions} : </Text>
            <Text style={styles.value}>{quiz.submissions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.duration} : </Text>
            <Text style={styles.value}>{getDuration()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.points} : </Text>
            <Text style={styles.value}>{quiz.points}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.createdAt} : </Text>
            <Text style={styles.value}>
              {moment(quiz.createdAt).format('Do MMM YYYY - hh:mm a')}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.startDate} : </Text>
            <Text style={styles.value}>
              {moment(quiz.startDate).format('Do MMM YYYY - hh:mm a')}
            </Text>
          </View>
          {quiz.endDate ? (
            <View style={styles.row}>
              <Text style={styles.label}>{I18n.Quiz.endDate} : </Text>
              <Text style={styles.value}>
                {moment(quiz.endDate).format('Do MMM YYYY - hh:mm a')}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.actionCont}>{checkTakeable()}</View>
      </ScrollView>
    </ImageBackground>
  );
}

export default memo(QuizIntro);
