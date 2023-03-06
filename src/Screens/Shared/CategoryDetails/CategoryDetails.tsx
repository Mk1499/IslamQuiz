import React from 'react';
import {ScrollView, ImageBackground, View, Text} from 'react-native';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import CategoryType from '../../../Models/Category.model';
import GradientCover from '../../../Components/GradientCover/GradientCover';
import DB from '../../../Config/DB';
import QuizCard from '../../../Components/QuizCard/QuizCard';
import QuizType from '../../../Models/Quiz.model';
import I18n, {getActiveLang} from '../../../translate';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
  route: {
    params: {
      category: CategoryType;
    };
  };
};

export default function CategoryDetails(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {category} = props.route.params;

  const goBack = () => {
    props.navigation.goBack();
  };

  const gotoQuizIntro = (quiz: QuizType) => {
    props.navigation.navigate('QuizIntro', {
      quiz,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <GradientCover
        onBack={goBack}
        coverURL={category.cover}
        title={getActiveLang() === 'en' ? category.enName : category.arName}
        description={
          getActiveLang() === 'en'
            ? category.descriptionEn
            : category.description
        }
      />
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <Text style={styles.secTitle}>{I18n.Category.quizzes}</Text>

        <View style={styles.quizzesCont}>
          {DB.latestQuizes.map(item => (
            <QuizCard
              item={item}
              action={() => gotoQuizIntro(item)}
              key={'quiz-' + item.id}
            />
          ))}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
