import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import makeStyle from './styles';

import HomeOption from '../../../Models/HomeOption.model';
import OptionCard from '../../../Components/OptionCard/OptionCard';
import I18n from '../../../translate';
import {useTheme} from '../../../Theme/ThemeProvider';
import CatCard from '../../../Components/CatCard/CatCard';
import CategoryType from '../../../Models/Category.model';
import LangSwitch from '../../../Components/LangSwitch/LangSwitch';
import Loading from '../../../Components/Loading/Loading';
import {get} from '../../../Services/api-service';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';
import QuizzesCarousel from '../../../Components/Carousel/QuizzesCarousel/QuizzesCarousel';
import screenNames from '../../../Routes/Stacks/screenNames';

type MyProps = {
  navigation: {
    navigate: Function;
  };
  userData: User;
};

function Home(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const options: HomeOption[] = [
    {
      smallText: I18n.Home.enter,
      bigText: I18n.Home.challenge,
      bgColor: '#FF7040',
      action: startChallenge,
      id: 'startChallenge',
    },
    {
      smallText: I18n.Home.challenge,
      bigText: I18n.Home.friend,
      bgColor: '#47cc49',
      action: joinQuiz,
      id: 'joinQuiz',
    },
    // {
    //   bigText: I18n.Home.friend,
    //   smallText: I18n.Home.challenge,
    //   bgColor: '#3248da',
    //   action: startChallenge,
    // },
  ];

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [refreshing, setrefreshing] = useState(false);

  function startChallenge() {
    props.navigation.navigate(screenNames.ChallengeLanding);
  }

  function joinQuiz() {
    props.navigation.navigate('JoinQuiz');
  }

  const gotoCategoryDetails = (category: CategoryType) => {
    props.navigation.navigate('CategoryDetails', {
      category,
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories(refresh = false) {
    const url = '/category';
    if (refresh) {
      setrefreshing(refresh);
    } else {
      setLoadingCats(true);
    }
    get(url)
      .then(({data}) => {
        // console.log('Cats : ', data);
        setCategories(data);
        setLoadingCats(false);
        setrefreshing(false);
      })
      .catch(() => {
        setLoadingCats(false);
        setrefreshing(false);
      });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategories(true)}
            refreshing={refreshing}
          />
        }>
        <ImageBackground
          source={require('../../../../assets/images/BGpattern.png')}
          style={styles.content}>
          <ImageBackground
            style={styles.upperSec}
            source={require('../../../../assets/images/BGpattern.png')}>
            <View style={[styles.row, styles.header]}>
              <LangSwitch />
              <Image
                source={require('../../../../assets/images/logoWhite.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.welcomeCont}>
              <View style={styles.textCont}>
                <Text style={styles.welcomeText}>{I18n.Home.welBack}</Text>
              </View>
              <View style={styles.textCont}>
                <Text style={styles.userName}>{props.userData.name}</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.optionsListCont}>
            <FlatList
              contentContainerStyle={styles.optionsList}
              data={options}
              horizontal
              renderItem={({item}) => <OptionCard item={item} />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={styles.section}>
            <QuizzesCarousel />
          </View>
          <View style={styles.section}>
            <View style={styles.secTitleCont}>
              <Text style={styles.secTitle}>{I18n.Home.categories}</Text>
            </View>
            <View>
              <FlatList
                contentContainerStyle={styles.catList}
                data={categories}
                renderItem={({item}) => (
                  <CatCard
                    item={item}
                    action={() => gotoCategoryDetails(item)}
                  />
                )}
                keyExtractor={item => item._id}
                numColumns={2}
              />
            </View>
            <Loading isVisible={loadingCats} />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  userData: state?.auth.userData,
});

export default connect(mapStateToProps, {})(memo(Home));
