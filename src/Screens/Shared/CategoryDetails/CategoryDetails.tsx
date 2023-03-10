import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  ImageBackground,
  View,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import CategoryType from '../../../Models/Category.model';
import GradientCover from '../../../Components/GradientCover/GradientCover';
import QuizCard from '../../../Components/QuizCard/QuizCard';
import QuizType from '../../../Models/Quiz.model';
import I18n, {getActiveLang} from '../../../translate';
import {get} from '../../../Services/api-service';
import Loading from '../../../Components/Loading/Loading';
import EmptyMsg from '../../../Components/EmptyMsg/EmptyMsg';

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
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const {category} = props.route.params;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getData(refresh = false) {
    let url = `/category/quizzes/${category._id}`;
    setRefreshing(refresh);
    get(url)
      .then(({data}) => {
        setQuizzes(data);
      })
      .catch(err => {
        console.log('Q Err : ', err);
      })
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  }

  const goBack = () => {
    props.navigation.goBack();
  };

  const gotoQuizIntro = (quiz: QuizType) => {
    props.navigation.navigate('QuizIntro', {
      quiz,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => getData(true)}
        />
      }>
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
      <ImageBackground source={category.cover} style={styles.container}>
        <Text style={styles.secTitle}>{I18n.Category.quizzes}</Text>

        <View style={styles.quizzesCont}>
          <FlatList
            data={quizzes}
            renderItem={({item}) => (
              <QuizCard
                item={item}
                action={() => gotoQuizIntro(item)}
                key={'quiz-' + item._id}
              />
            )}
            ListEmptyComponent={
              !loading && <EmptyMsg msg={I18n.EmptyMsg.nqQuizzesInCat} />
            }
          />
          <Loading isVisible={loading} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
