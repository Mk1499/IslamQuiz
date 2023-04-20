import React, {memo, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {get} from '../../../Services/api-service';
import Carousel from 'react-native-reanimated-carousel';
import Constants from '../../../Config/Constants';
import QuizCard from '../../QuizCard/QuizCard';
import {moderateScale} from 'react-native-size-matters';

const {width} = Constants;
function QuizzesCarousel() {
  const [quizzes, setQuizzes] = useState([]);
  const {navigate} = useNavigation();

  useEffect(() => {
    getQuizzes();
  }, []);

  function gotoQuizIntro(quiz) {
    navigate('QuizIntro', {
      quiz,
    });
  }

  function getQuizzes() {
    const url = '/quiz/latest';
    get(url, true).then(({data}) => {
      setQuizzes(data);
    });
  }

  return (
    <View>
      <Carousel
        loop
        mode="parallax"
        vertical={false}
        width={width}
        height={moderateScale(180)}
        autoPlay={true}
        data={quizzes}
        scrollAnimationDuration={1000}
        renderItem={({item}) => (
          <QuizCard
            action={() => gotoQuizIntro(item)}
            key={`quiz-${item._id}`}
            item={item}
          />
        )}
      />
    </View>
  );
}

export default memo(QuizzesCarousel);
