import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import makeStyle from './QuestionForm.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import MyButton from '../../Native/MyButton/MyButton';
import AnswerType from '../../../Models/Answer.model';
import I18n from '../../../translate';
import {MyInput, MyTextArea} from '../../Native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {v4 as uuidv4} from 'uuid';
import {showError} from '../../../Services/toast-service';

type MyProps = {
  handleNext: Function;
  lastQuestion: boolean;
  processing: boolean;
};

export default forwardRef(function QuestionForm(
  {handleNext, lastQuestion, processing}: MyProps,
  ref,
) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [answers, setAnswers] = useState([]);
  const [right, setRight] = useState();
  const [activeAns, setActiveAns] = useState('');
  const [label, setLabel] = useState('');
  const answerRef = useRef();
  const questionRef = useRef();
  const pointsRef = useRef();
  const [points, setPoints] = useState(null);

  useImperativeHandle(ref, () => ({
    resetForm() {
      questionRef?.current?.clear();
      answerRef?.current?.clear();
      pointsRef?.current?.clear();
      setAnswers([]);
      setRight(null);
      setLabel('');
      setPoints(null);
    },
  }));

  useEffect(() => {
    // console.log('Props : ', processing);
  }, [processing]);

  function chooseAnswer(ans: AnswerType) {
    setRight(ans);
  }

  function onNext() {
    if (!right) {
      showError(I18n.ErrorMessage.defineCorrect);
    } else {
      let data = {
        label,
        points,
        answers,
        rightAnswer: right.label,
      };
      handleNext(data);
    }
  }

  function newAnswer() {
    if (activeAns) {
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
  }

  function nextValid() {
    return points && label && answers.length >= 2;
  }

  function deleteAnswer(id) {
    const filteredArr = answers.filter(item => item.id !== id);
    setAnswers(filteredArr);
    if (right?.id === id) {
      setRight(null);
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{question.label}</Text> */}
      <MyTextArea
        placeholder={I18n.CreateQuiz.enterQuestion}
        onChange={t => setLabel(t)}
        ref={questionRef}
      />
      <MyInput
        placeholder={I18n.CreateQuiz.points}
        keyboardType="number-pad"
        onChange={p => setPoints(p)}
        style={styles.pointsInput}
        ref={pointsRef}
      />
      {answers.map(item => (
        <View style={styles.row} key={item.id}>
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
          placeholder={I18n.CreateQuiz.addAnswer}
          onChange={t => setActiveAns(t)}
          ref={answerRef}
        />
      </View>
      <MyButton
        label={lastQuestion ? I18n.Global.finish : I18n.Global.next}
        action={onNext}
        disabled={!nextValid()}
        processing={processing}
      />
    </View>
  );
});
