import React, {memo, useEffect, useState} from 'react';
import {
  ScrollView,
  ImageBackground,
  View,
  Text,
  FlatList,
  RefreshControl,
  Switch,
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

function CategoryDetails(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState(true);

  const {category} = props.route.params;

  useEffect(() => {
    getData(false, true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getData(refresh = false, filter = false, reload = false) {
    let url;
    if (filter) {
      url = `/category/quizzes/filtered/${category._id}`;
    } else {
      url = `/category/quizzes/${category._id}`;
    }
    setRefreshing(refresh);
    setLoading(reload);
    get(url, true)
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

  const toggleFilteration = () => {
    setFiltered(!filtered);
    getData(false, !filtered, true);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => getData(true, filtered, false)}
          colors={[colors.primary]}
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
        <View style={styles.secTitleCont}>
          <Text style={styles.secTitle}>{I18n.Category.quizzes}</Text>
        </View>

        <View style={styles.quizzesCont}>
          <View style={styles.switchCont}>
            {/* <Text style={styles.switchLabel}>{I18n.Category.showFiltered}</Text> */}
            <Switch
              trackColor={{false: colors.lightText, true: colors.primary}}
              value={filtered}
              onChange={toggleFilteration}
            />
            <Text style={styles.switchLabel}>{I18n.Category.showFiltered}</Text>
          </View>
          {!loading && (
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
          )}
          <Loading isVisible={loading} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default memo(CategoryDetails);
