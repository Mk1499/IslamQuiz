import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import makeStyle from './AnsweredQuestion.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import AnswerType from '../../../Models/Answer.model';
import Submit from '../../../Models/Submit.model';

type MyProps = {
  submit: Submit;
};

function AnsweredQuestion({submit}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  // function chooseAnswer(ans: AnswerType) {
  //   setChoosedID(ans._id);
  // }

  const ansStyle = (ans: AnswerType) => {
    if (ans._id === submit.answer) {
      if (ans._id === submit.question.rightAnswer) {
        return styles.choosedAnswerContRight;
      } else {
        return styles.choosedAnswerContWrong;
      }
    } else if (ans._id === submit.question.rightAnswer) {
      return styles.choosedAnswerContRight;
    } else {
      return styles.answerCont;
    }
  };

  const ansLabelStyle = (ans: AnswerType) => {
    if (ans._id === submit.answer) {
      return styles.choosedAnswerLabel;
    } else if (ans._id === submit.question.rightAnswer) {
      return styles.choosedAnswerLabel;
    } else {
      return styles.answerLabel;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{submit.question.label}</Text>
      {submit.question.answers?.map(item => (
        <TouchableOpacity style={ansStyle(item)} activeOpacity={1}>
          <Text style={ansLabelStyle(item)}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default memo(AnsweredQuestion);
