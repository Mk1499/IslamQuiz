import React, {useState, useEffect, memo, useRef} from 'react';
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
import {
  errorHandler,
  showError,
  showSuccess,
} from '../../../Services/toast-service';
import moment from 'moment';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';
import {syncUserData} from '../../../Redux/Actions/auth.action';
import QuizPointsModal from '../../../Components/Modals/QuizPoints/QuizPoints';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import QuizReportModal from '../../../Components/Modals/QuizReportModal/QuizReportModal';
import screenNames from '../../../Routes/Stacks/screenNames';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
    replace: Function;
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
  const [showReportModal, setShowReportModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submittion, setSubmittion] = useState([]);
  const [points, setPoints] = useState(0);
  const [submittionID, setSubmittionID] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [timerRun, setTimerRun] = useState(false);
  const [addingReport, setAddingReport] = useState(false);
  const startTime = moment();
  const ref = useRef();

  useEffect(() => {
    let quizID = route?.params?.quiz?._id;
    let url = `/quiz/questions/${quizID}`;
    get(url)
      .then(({data}) => {
        // console.log('MKQ : ', data);
        setQuiz(data);
        setTimerRun(true);
        setLoading(false);
      })
      .catch(() => {
        showError(I18n.ErrorMessage.prevSubmitted);
        navigation.goBack();
        console.log('Err : ', err);
      })
      .finally(() => {});
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
    const time = moment().diff(startTime, 'milliseconds');
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
        // console.log('Sub Data : ', data);
        const {score, _id} = data;
        setPoints(score);
        setSubmittionID(_id);
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
    setShowReportModal(false);
  }

  function backToQuizzes() {
    hideAllModals();
    navService.backMultiLevels(2);
  }

  function addReport(report: string) {
    const url = '/feedback/add';
    let quizID = route?.params?.quiz?._id;
    const body = {
      comment: report,
      user: user._id,
      quiz: quizID,
    };
    setAddingReport(true);

    post(url, body, true)
      .then(({data}) => {
        console.log('Report Data Res : ', data);
        showSuccess(I18n.SuccessMsg.feedbackSend);
      })
      .catch(err => {
        console.log('Err : ', err);
      })
      .finally(() => {
        setAddingReport(false);
        hideAllModals();
      });
  }

  function shareScore() {
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
  }

  function gotohistory() {
    setShowSuccessModal(false);
    // navigation.replace('Tabs', {
    //   screen: screenNames.QuizAnswers,
    //   params: {
    //     submitID: submittionID,
    //   },
    // });
    navigation.navigate(screenNames.QuizAnswers, {
      submitID: submittionID,
      backToHome: true,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <ViewShot
        ref={ref}
        captureMode="mount"
        options={{fileName: 'IQuiz-Submit', format: 'jpg', quality: 0.9}}>
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
            {quiz?.duration?.value && !loading ? (
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
            ) : null}
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
              question={quiz?.questions[currentQuestion]}
              handleNext={ansSubmit => handleNextClicked(ansSubmit)}
              lastQuestion={currentQuestion === quiz?.questions?.length - 1}
              processing={submitting}
            />
            <View style={styles.btnsCont}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shareBtn}
                onPress={exitPrompt}>
                <Text style={styles.shareLabel}>{I18n.Quiz.exit}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shareBtn}
                onPress={() => setShowReportModal(true)}>
                <Text style={styles.shareLabel}>{I18n.Quiz.report}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shareBtn}
                onPress={shareScore}>
                <Text style={styles.shareLabel}>{I18n.Global.share}</Text>
              </TouchableOpacity>
            </View>
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
        {/* <SingleModal
        img="happy"
        title={I18n.Modals.successTitle}
        msg={I18n.Modals.successMsg + points + I18n.Modals.points}
        btnText={I18n.Global.back}
        visible={showSuccessModal}
        btnAction={backToQuizzes}
      /> */}
        <QuizPointsModal
          img="happy"
          title={I18n.Modals.successTitle}
          msg={I18n.Modals.successMsg}
          btn1Text={I18n.Global.share}
          btn2Text={I18n.Global.back}
          btn2Action={backToQuizzes}
          visible={showSuccessModal}
          points={points}
          totalPoints={quiz.points}
          quizID={quiz._id}
          btn3Text={I18n.Modals.reviewAnswers}
          btn3Action={gotohistory}
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
        <QuizReportModal
          img="sad"
          title={I18n.Quiz.reportHead}
          msg={I18n.Modals.exitMsg}
          btn1Text={I18n.Global.back}
          btn1Action={hideAllModals}
          btn2Text={I18n.Global.send}
          btn2Action={report => addReport(report)}
          visible={showReportModal}
          btn2Processing={addingReport}
        />
      </ViewShot>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {syncUserData})(memo(QuizDetails));
