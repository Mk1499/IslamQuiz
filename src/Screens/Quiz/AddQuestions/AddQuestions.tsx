import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './AddQuestion.style';
import ProgressIndicator from '../../../Components/Quiz/ProgressIndicator/ProgressIndicator';
import I18n from '../../../translate';
import MultiModal from '../../../Components/Modals/MultiModal/MultiModal';
import QuestionForm from '../../../Components/Quiz/QuestionForm/QuestionForm';
// import {deleteQuiz} from '../../../Services/quiz-service';
import {post} from '../../../Services/api-service';
import QuizSuccessModal from '../../../Components/Modals/QuizSuccess/QuizSuccess';
import NavigationService from '../../../Routes/NavigationService';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
  route: {
    params: any;
  };
};

type QuestionSubmit = {
  label: String;
  answers: {
    label: String;
  };
  points: String;
  rigthAnswer: String;
};

export default function AddQuestions({route}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [code, setCode] = useState('');
  const [quizID, setQuizID] = useState('');
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    setCode(route.params?.code);
    setQuizID(route?.params.quizID);
    setNoOfQuestions(parseInt(route?.params.questionNum, 10));
  }, [route.params?.code, route.params.questionNum, route.params.quizID]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setShowExitModal(true);
    });
  }, []);

  function handleNextClicked(data: QuestionSubmit) {
    // console.log('Data : ', data);
    const {answers, label, points, rigthAnswer} = data;
    setAddingQuestion(true);
    const url = '/quiz/addNewQuestion';
    const body = {
      quizID,
      label,
      answers,
      rigthAnswer,
      points: parseInt(points, 10),
    };
    post(url, body)
      .then(() => {
        // console.log('Curent : ', currentQuestion);
        // console.log('no Of Q  : ', noOfQuestions);
        if (currentQuestion + 1 < noOfQuestions) {
          formRef?.current?.resetForm();
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowSuccessModal(true);
        }
      })
      .catch(err => {
        console.log('add q err : ', err);
      })
      .finally(() => {
        setAddingQuestion(false);
      });
  }

  function exit() {
    hideAllModals();
    // deleteQuiz(quizID);
    NavigationService.backMultiLevels(2);
  }

  function exitPrompt() {
    setShowExitModal(true);
  }

  function hideAllModals() {
    setShowSuccessModal(false);
    setShowExitModal(false);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperCont}>
        <View style={styles.row}>
          <Text style={styles.questionNumber}>
            {I18n.Quiz.question} {currentQuestion + 1}
          </Text>
          {/* <Timer time={} handleFinish={timeOut} stop={showSuccessModal} /> */}
        </View>
        <ProgressIndicator
          noOfQuestions={noOfQuestions}
          activeIndex={currentQuestion}
        />
      </View>
      <View style={styles.lowerCont}>
        <QuestionForm
          handleNext={data => handleNextClicked(data)}
          lastQuestion={currentQuestion === noOfQuestions - 1}
          processing={addingQuestion}
          ref={formRef}
        />
        <TouchableOpacity style={styles.exitBtn} onPress={exitPrompt}>
          <Text style={styles.exitText}>{I18n.Quiz.exit}</Text>
        </TouchableOpacity>
      </View>
      <MultiModal
        img="sad"
        title={I18n.Modals.cancelCreateTitle}
        msg={I18n.Modals.cancelCreateMsg}
        btn1Text={I18n.Modals.exit}
        btn1Action={exit}
        btn2Text={I18n.Modals.continue}
        btn2Action={() => setShowExitModal(false)}
        visible={showExitModal}
      />

      <QuizSuccessModal
        img="happy"
        title={I18n.Modals.successTitle}
        msg={I18n.Modals.quizCreateSuccess}
        btnText={I18n.Modals.exit}
        btnAction={exit}
        // btn2Text={I18n.Modals.continue}
        // btn2Action={() => setShowExitModal(false)}
        visible={showSuccessModal}
        code={code}
      />
    </ScrollView>
  );
}
