import React, {memo, useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import AnsweredQuestion from '../../../Components/Quiz/AnsweredQuestion/AnsweredQuestion';
import ProgressIndicator from '../../../Components/Quiz/ProgressIndicator/ProgressIndicator';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './styles';
import I18n from '../../../translate';
import Submit from '../../../Models/Submit.model';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
  route: {
    params: {
      submit: Submit;
    };
  };
};

function QuizAnswers(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submits, setSubmits] = useState<Submit[]>([]);

  useEffect(() => {
    const s = props.route.params.submit;
    console.log('S : ', s);
    setSubmits(s);
  }, [props]);

  function handleNextClicked() {
    if (submits.length - 1 > currentQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      props.navigation.goBack();
    }
  }

  function handlePrev() {
    if (currentQuestion >= 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      props.navigation.goBack();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperCont}>
        <View style={styles.row}>
          <Text style={styles.questionNumber}>
            {I18n.Quiz.question} {currentQuestion + 1}
          </Text>
        </View>
        <ProgressIndicator
          noOfQuestions={submits?.length}
          activeIndex={currentQuestion}
        />
      </View>

      <View style={styles.lowerCont}>
        {submits.length ? (
          <AnsweredQuestion
            submit={submits[currentQuestion]}
            // lastQuestion={currentQuestion === submits?.length - 1}
          />
        ) : null}

        <View style={styles.btnsCont}>
          <TouchableOpacity style={styles.exitBtn} onPress={handleNextClicked}>
            <Text style={styles.exitText}>
              {currentQuestion < submits?.length - 1
                ? I18n.Global.next
                : I18n.Quiz.exit}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitBtn} onPress={handlePrev}>
            <Text style={styles.exitText}>
              {currentQuestion > 0 ? I18n.Global.prev : I18n.Quiz.exit}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default memo(QuizAnswers);