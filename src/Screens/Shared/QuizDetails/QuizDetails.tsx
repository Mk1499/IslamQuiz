import React from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import makeStyle from './QuizDetails.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import GradientCover from '../../../Components/GradientCover/GradientCover';
import I18n from '../../../translate';
import QuizType from '../../../Models/Quiz.model';
import DB from '../../../Config/DB';
import moment from 'moment';
import MyButton from '../../../Components/Native/MyButton/MyButton';

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

export default function QuizDetails(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  //   const {quiz} = props.route.params;
  const quiz = DB.quiz;

  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <GradientCover
        onBack={goBack}
        coverURL={quiz.cover}
        title={quiz.title}
        description={quiz.description}
      />
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.content}>
        <View style={styles.metaDateCont}>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.noOfQuestions} : </Text>
            <Text style={styles.value}>{quiz.noOfQuestions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.noOfSubmissions} : </Text>
            <Text style={styles.value}>{quiz.noOfSubmissions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.duration} : </Text>
            <Text style={styles.value}>
              {quiz.time} {I18n.Quiz.minutes}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.difficulty} : </Text>
            <Text style={styles.value}>{I18n.Quiz[quiz.difficulty]}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.Quiz.startDate} : </Text>
            <Text style={styles.value}>
              {moment().format('Do MMM YYYY - hh:mm a')}
            </Text>
          </View>
        </View>

        <View>
          <MyButton label={I18n.Quiz.start} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
