import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
// import Timer from '../../../Components/Quiz/Timer/Timer';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './QuizDetails.style';
import ProgressIndicator from '../../../Components/Quiz/ProgressIndicator/ProgressIndicator';
import Question from '../../../Components/Quiz/Question/Question';
import I18n from '../../../translate';
import SingleModal from '../../../Components/Modals/SingleModal/SingleModal';
import MultiModal from '../../../Components/Modals/MultiModal/MultiModal';
import navService from '../../../Routes/NavigationService';
import QuizType from '../../../Models/Quiz.model';
import {get, post} from '../../../Services/api-service';
import Loading from '../../../Components/Loading/Loading';
import CountDown from 'react-native-countdown-component';
import {errorHandler, showError} from '../../../Services/toast-service';
import moment from 'moment';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';
import {syncUserData} from '../../../Redux/Actions/auth.action';

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
  user: User;
  syncUserData: Function;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
function QuizDetails({navigation, route, user, syncUserData}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [quiz, setQuiz] = useState<QuizType>(route?.params?.quiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showErrModal, setShowErrModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submittion, setSubmittion] = useState([]);
  const [points, setPoints] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [timerRun, setTimerRun] = useState(false);
  const startTime = moment();

  useEffect(() => {
    let quizID = route?.params?.quiz?._id;
    let url = `/quiz/questions/${quizID}`;
    get(url)
      .then(({data}) => {
        setQuiz(data);
        setTimerRun(true);
      })
      .catch(() => {
        showError(I18n.ErrorMessage.prevSubmitted);
        navigation.goBack();
        // console.log('Err : ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigation, route?.params?.quiz?._id]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setShowExitModal(true);
    });
  }, []);

  function timeOut() {
    setShowErrModal(true);
  }

  function handleNextClicked(ansSubmit) {
    setSubmittion([...submittion, ansSubmit]);
    if (quiz.questions.length - 1 > currentQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submit(ansSubmit);
    }
  }

  function exit() {
    hideAllModals();
    navigation.goBack();
  }
  function submit(lastAns) {
    const time = moment().diff(startTime);
    const body = {
      userID: user._id,
      quizID: quiz._id,
      submit: [...submittion, lastAns],
      time,
    };
    const url = '/submit/add';
    setSubmitting(true);
    setTimerRun(false);
    post(url, body, true)
      .then(({data}) => {
        setPoints(data);
        setShowSuccessModal(true);
        syncUserData(user._id);
      })
      .catch(() => {
        console.log('SE : ', err);
        errorHandler();
        navigation.goBack();
      })
      .finally(() => {
        setSubmitting(false);
      });
    // exit();
  }

  function exitPrompt() {
    setShowExitModal(true);
  }

  function hideAllModals() {
    setShowErrModal(false);
    setShowSuccessModal(false);
    setShowExitModal(false);
  }

  function backToQuizzes() {
    hideAllModals();
    navService.backMultiLevels(2);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperCont}>
        <View style={styles.row}>
          <Text style={styles.questionNumber}>
            {I18n.Quiz.question} {currentQuestion + 1}
          </Text>
          {/* <Timer
            time={quiz?.duration.value}
            handleFinish={timeOut}
            stop={showSuccessModal}
          /> */}
          <CountDown
            timeToShow={['M', 'S']}
            digitTxtStyle={styles.digitText}
            digitStyle={styles.digit}
            until={quiz?.duration?.value * 60}
            timeLabels={{
              m: '',
              s: '',
            }}
            style={styles.timer}
            onFinish={timeOut}
            running={timerRun}
          />
        </View>
        <ProgressIndicator
          noOfQuestions={quiz.noOfQuestions}
          activeIndex={currentQuestion}
        />
      </View>
      {loading ? (
        <Loading isVisible={true} />
      ) : (
        <View style={styles.lowerCont}>
          <Question
            question={quiz.questions[currentQuestion]}
            handleNext={ansSubmit => handleNextClicked(ansSubmit)}
            lastQuestion={currentQuestion === quiz.questions?.length - 1}
            processing={submitting}
          />
          <TouchableOpacity style={styles.exitBtn} onPress={exitPrompt}>
            <Text style={styles.exitText}>{I18n.Quiz.exit}</Text>
          </TouchableOpacity>
        </View>
      )}

      <SingleModal
        img="time"
        title={I18n.Modals.timeOut}
        msg={I18n.Modals.quizTimeOut}
        btnText={I18n.Modals.exit}
        visible={showErrModal}
        btnAction={exit}
      />
      <SingleModal
        img="happy"
        title={I18n.Modals.successTitle}
        msg={I18n.Modals.successMsg + points + I18n.Modals.points}
        btnText={I18n.Global.back}
        visible={showSuccessModal}
        btnAction={backToQuizzes}
      />
      <MultiModal
        img="sad"
        title={I18n.Modals.exitTitle}
        msg={I18n.Modals.exitMsg}
        btn1Text={I18n.Modals.exit}
        btn1Action={exit}
        btn2Text={I18n.Modals.continue}
        btn2Action={() => setShowExitModal(false)}
        visible={showExitModal}
      />
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {syncUserData})(memo(QuizDetails));
