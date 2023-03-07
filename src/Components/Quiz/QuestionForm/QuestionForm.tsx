import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import makeStyle from './QuestionForm.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import QuestionType from '../../../Models/Question.model';
import MyButton from '../../Native/MyButton/MyButton';
import AnswerType from '../../../Models/Answer.model';
import I18n from '../../../translate';
import {MyInput, MyTextArea} from '../../Native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {v4 as uuidv4} from 'uuid';

type MyProps = {
  question: QuestionType;
  handleNext: Function;
  lastQuestion: boolean;
};

export default function QuestionForm({handleNext, lastQuestion}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [choosedID, setChoosedID] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [right, setRight] = useState();
  const [activeAns, setActiveAns] = useState('');
  const [question, setQuestion] = useState('');
  const answerRef = useRef();

  function chooseAnswer(ans: AnswerType) {
    setRight(ans);
  }

  function onNext() {
    handleNext();
    setChoosedID(null);
  }

  function newAnswer() {
    const newAns = {
      id: uuidv4(),
      label: activeAns,
    };
    setAnswers([...answers, newAns]);
    setTimeout(() => {
      setActiveAns('');
    }, 500);

    answerRef?.current?.clear();
  }

  function nextValid() {
    return question && answers.length >= 2;
  }

  function deleteAnswer(id) {
    const filteredArr = answers.filter(item => item.id !== id);
    console.log('id : ', id, filteredArr);
    setAnswers(filteredArr);
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{question.label}</Text> */}
      <MyTextArea placeholder="Enter Question" onChange={t => setQuestion(t)} />
      {answers.map(item => (
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => deleteAnswer(item.id)}
            style={[styles.icon, styles.delIcon]}>
            <Icon name="delete" as={AntDesign} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              right?.id === item.id
                ? styles.choosedAnswerCont
                : styles.answerCont
            }
            onPress={() => chooseAnswer(item)}
            activeOpacity={0.5}>
            <Text
              style={
                right?.id === item.id
                  ? styles.choosedAnswerLabel
                  : styles.answerLabel
              }>
              {item.label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => newAnswer()} style={styles.icon}>
          <Icon name="plus" as={AntDesign} color={'#fff'} />
        </TouchableOpacity>
        <MyInput
          style={styles.ansInput}
          placeholder="Enter Answer"
          onChange={t => setActiveAns(t)}
          ref={answerRef}
        />
      </View>
      <MyButton
        label={lastQuestion ? I18n.Global.finish : I18n.Global.next}
        action={onNext}
        disabled={!nextValid()}
      />
    </View>
  );
}
