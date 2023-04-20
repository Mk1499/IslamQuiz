import React, {memo, useState} from 'react';
import {ScrollView} from 'react-native';
import GradientCover from '../../../Components/GradientCover/GradientCover';
import CreateForm from '../../../Components/Quiz/CreateForm/CreateForm';
import {post} from '../../../Services/api-service';
import {showError} from '../../../Services/toast-service';

type MyProps = {
  navigation: {
    goBack: Function;
    navigate: Function;
  };
};
function CreateQuiz(props: MyProps) {
  // const {colors} = useTheme();
  // const styles = makeStyle(colors);
  const [creatingQuiz, setCreatingQuiz] = useState(false);

  function goBack() {
    props.navigation.goBack();
  }

  function submit(body) {
    setCreatingQuiz(true);
    const url = '/quiz/add';
    post(url, body)
      .then(({data}) => {
        props.navigation.navigate('AddQuestions', {
          code: data?.code,
          questionNum: body.questionNum,
          quizID: data?._id,
          duration: data?.duration,
        });
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
    <ScrollView>
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
export default memo(CreateQuiz);
