import React, {useState, useRef} from 'react';
import {ScrollView, Animated} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './CreateQiuz.style';
import GradientCover from '../../Components/GradientCover/GradientCover';
import CreateForm from '../../Components/Quiz/CreateForm/CreateForm';
import {post} from '../../Services/api-service';
import {showError} from '../../Services/toast-service';

type MyProps = {
  navigation: {
    goBack: Function;
  };
};
export default function CreateQuiz(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [code, setCode] = useState();
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const formOpacity = useRef(new Animated.Value(1)).current;

  function goBack() {
    props.navigation.goBack();
  }

  function submit(body) {
    setCreatingQuiz(true);
    const url = '/quiz/add';
    post(url, body)
      .then(({data}) => {
        console.log('quiz Data : ', data);
        setCode(data?.code);
        setNoOfQuestions(body.questionNum);
        setActiveView('questions');
      })
      .catch(err => {
        console.log('get quiz err : ', err);
        if (err?.message) {
          showError(err?.message);
        }
      })
      .finally(() => {
        setCreatingQuiz(false);
      });
  }

  return (
    <ScrollView style={styles.container}>
      <GradientCover onBack={goBack} />
      <CreateForm
        processing={creatingQuiz}
        handleNext={data => {
          submit(data);
        }}
      />
    </ScrollView>
  );
}
