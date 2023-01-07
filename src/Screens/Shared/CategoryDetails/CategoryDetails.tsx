import React, {useEffect} from 'react';
import {ScrollView, ImageBackground, View} from 'react-native';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';
import CategoryType from '../../../Models/Category.model';
import GradientCover from '../../../Components/GradientCover/GradientCover';
import DB from '../../../Config/DB';
import QuizCard from '../../../Components/QuizCard/QuizCard';

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

  useEffect(() => {
    console.log('Props : ', props);
  }, [props]);

  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <GradientCover
        onBack={goBack}
        coverURL={category.cover}
        title={category.title}
        description={category.description}
      />
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <View style={styles.quizzesCont}>
          {DB.latestQuizes.map(item => (
            <QuizCard item={item} />
          ))}
        </View>
        {/* <FlatList
          data={DB.latestQuizes}
          renderItem={({item}) => }
        /> */}
      </ImageBackground>
    </ScrollView>
  );
}
