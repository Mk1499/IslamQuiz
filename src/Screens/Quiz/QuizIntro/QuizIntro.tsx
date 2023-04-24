import React, {memo, useRef, useEffect, useState} from 'react';
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
import ViewShot, {captureRef} from 'react-native-view-shot';
import Loading from '../../../Components/Loading/Loading';
import {get} from '../../../Services/api-service';
import {errorHandler} from '../../../Services/toast-service';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
  route: {
    params: {
      quiz: QuizType;
      id: string;
    };
  };
};

function QuizIntro(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {quiz, id} = props.route.params;
  const [quizData, setQuizData] = useState<QuizType>();
  const [loading, setLoading] = useState<Boolean>(true);

  const ref = useRef();

  useEffect(() => {
    if (quiz) {
      setQuizData(quiz);
      setLoading(false);
    } else {
      getQuizData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getQuizData() {
    let url = `/quiz/metadata/${id}`;
    get(url)
      .then(({data}) => {
        setQuizData(data);
      })
      .catch(() => {
        errorHandler('');
        props.navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const goBack = () => {
    props.navigation.goBack();
  };

  const startQuiz = () => {
    props.navigation.navigate('QuizDetails', {
      quiz: quizData,
    });
  };

  const share = () => {
    const message = `
    اختبر معلوماتك وتنافس معي عبر تطبيق متنافسون، هل أنت جاهز؟
    https://iquizz.netlify.app/mobile/quiz-${quiz._id}
    `;
    captureRef(ref, {
      format: 'jpg',
      quality: 0.8,
    })
      .then(url => {
        console.log('UR : ', url);
        Share.open({
          message,
          url,
        });
      })
      .catch(err => {
        console.log('err : ', err);
      });
  };

  function getDuration() {
    return getActiveLang() === 'en'
      ? quizData?.duration?.enName
      : quizData?.duration?.arName;
  }

  function checkTakeable() {
    const endDate: Date = quizData.endDate;
    const startDate: Date = quizData.startDate;
    const isFuture = startDate ? moment().diff(startDate, 's') < 0 : false;
    const isExpired = endDate ? moment().diff(endDate, 's') > 0 : false;
    if (!quizData.noOfQuestions) {
      return false;
    } else if (isFuture) {
      console.log('Diff : ', moment().diff(quizData.startDate, 's'));
      return (
        <CountDown
          timeToShow={['D', 'H', 'M', 'S']}
          digitTxtStyle={styles.digitText}
          digitStyle={styles.digit}
          timeLabelStyle={styles.labelStyle}
          until={-1 * moment().diff(quizData.startDate, 's')}
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
      {loading ? (
        <View style={styles.loadingCont}>
          <Loading isVisible={true} />
        </View>
      ) : (
        <ViewShot
          ref={ref}
          captureMode="mount"
          options={{fileName: 'Your-File-Name', format: 'jpg', quality: 0.9}}>
          <ScrollView style={styles.container}>
            <GradientCover
              onBack={goBack}
              coverURL={quizData.cover}
              title={quizData.name}
              description={quizData.description}
              onShare={share}
            />
            <View style={styles.metaDateCont}>
              <View style={styles.row}>
                <Text style={styles.label}>{I18n.Quiz.noOfQuestions} : </Text>
                <Text style={styles.value}>{quizData.noOfQuestions}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>{I18n.Quiz.noOfSubmissions} : </Text>
                <Text style={styles.value}>{quizData.submissions}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>{I18n.Quiz.duration} : </Text>
                <Text style={styles.value}>{getDuration()}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>{I18n.Quiz.points} : </Text>
                <Text style={styles.value}>{quizData.points}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>{I18n.Quiz.createdAt} : </Text>
                <Text style={styles.value}>
                  {moment(quizData.createdAt).format('Do MMM YYYY - hh:mm a')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>{I18n.Quiz.startDate} : </Text>
                <Text style={styles.value}>
                  {moment(quizData.startDate).format('Do MMM YYYY - hh:mm a')}
                </Text>
              </View>
              {quizData.endDate ? (
                <View style={styles.row}>
                  <Text style={styles.label}>{I18n.Quiz.endDate} : </Text>
                  <Text style={styles.value}>
                    {moment(quizData.endDate).format('Do MMM YYYY - hh:mm a')}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.actionCont}>{checkTakeable()}</View>
          </ScrollView>
        </ViewShot>
      )}
    </ImageBackground>
  );
}

export default memo(QuizIntro);
