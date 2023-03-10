import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import Timer from '../../../Components/Quiz/Timer/Timer';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './QuizDetails.style';
import ProgressIndicator from '../../../Components/Quiz/ProgressIndicator/ProgressIndicator';
import Question from '../../../Components/Quiz/Question/Question';
import I18n from '../../../translate';
import SingleModal from '../../../Components/Modals/SingleModal/SingleModal';
import MultiModal from '../../../Components/Modals/MultiModal/MultiModal';
import navService from '../../../Routes/NavigationService';
import QuizType from '../../../Models/Quiz.model';
import {get} from '../../../Services/api-service';
import Loading from '../../../Components/Loading/Loading';

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

export default function QuizDetails({navigation, route}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [quiz, setQuiz] = useState<QuizType>(route?.params?.quiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showErrModal, setShowErrModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let quizID = route?.params?.quiz?._id;
    let url = `/quiz/${quizID}`;
    get(url)
      .then(({data}) => {
        console.log('Quiz : ', data);
        setQuiz(data);
      })
      .catch(err => {
        console.log('Err : ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route?.params?.quiz?._id]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setShowExitModal(true);
    });
  }, []);

  function timeOut() {
    setShowErrModal(true);
  }

  function handleNextClicked() {
    if (quiz.questions.length - 1 > currentQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submit();
    }
  }

  function exit() {
    hideAllModals();
    navigation.goBack();
  }
  function submit() {
    // exit();
    setShowSuccessModal(true);
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
          <Timer
            time={quiz?.duration.value}
            handleFinish={timeOut}
            stop={showSuccessModal}
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
            handleNext={handleNextClicked}
            lastQuestion={currentQuestion === quiz.questions?.length - 1}
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
        msg={I18n.Modals.successMsg + quiz?.points + I18n.Modals.points}
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
