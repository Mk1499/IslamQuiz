import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Timer from '../../../Components/Quiz/Timer/Timer';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './QuizDetails.style';
import ProgressIndicator from '../../../Components/Quiz/ProgressIndicator/ProgressIndicator';
import DB from '../../../Config/DB';
import Question from '../../../Components/Quiz/Question/Question';
import I18n from '../../../translate';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
};

export default function QuizDetails({navigation}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [quiz] = useState(DB.quiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function timeOut() {}

  function handleNextClicked() {
    if (quiz.questions.length - 1 > currentQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function exit() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperCont}>
        <View style={styles.row}>
          <Text style={styles.questionNumber}>
            {I18n.Quiz.question} {currentQuestion + 1}
          </Text>
          <Timer time={2} handleFinish={timeOut} />
        </View>
        <ProgressIndicator
          noOfQuestions={quiz.noOfQuestions}
          activeIndex={currentQuestion}
        />
      </View>
      <View style={styles.lowerCont}>
        <Question
          question={quiz.questions[currentQuestion]}
          handleNext={handleNextClicked}
        />
        <TouchableOpacity style={styles.exitBtn} onPress={exit}>
          <Text style={styles.exitText}>{I18n.Quiz.exit}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
