import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import makeStyle from './Question.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import QuestionType from '../../../Models/Question.model';
import MyButton from '../../Native/MyButton/MyButton';
import AnswerType from '../../../Models/Answer.model';
import I18n from '../../../translate';

type MyProps = {
  question: QuestionType;
  handleNext: Function;
};

export default function Question({question, handleNext}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [choosedID, setChoosedID] = useState(null);

  function chooseAnswer(ans: AnswerType) {
    setChoosedID(ans.id);
  }

  function onNext() {
    handleNext();
    setChoosedID(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{question.label}</Text>
      {question.answers.map(item => (
        <TouchableOpacity
          style={
            choosedID === item.id ? styles.choosedAnswerCont : styles.answerCont
          }
          onPress={() => chooseAnswer(item)}
          activeOpacity={0.5}>
          <Text
            style={
              choosedID === item.id
                ? styles.choosedAnswerLabel
                : styles.answerLabel
            }>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
      <MyButton
        label={I18n.Global.next}
        action={onNext}
        disabled={!choosedID}
      />
    </View>
  );
}
