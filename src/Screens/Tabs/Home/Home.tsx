import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import makeStyle from './styles';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeOption from '../../../Models/HomeOption.model';
import OptionCard from '../../../Components/OptionCard/OptionCard';
import I18n, {getActiveLang, setActiveLang} from '../../../translate';
import {useTheme} from '../../../Theme/ThemeProvider';
import DB from '../../../Config/DB';
import CatCard from '../../../Components/CatCard/CatCard';

export default function Home() {
  const {colors, setLangUpdated, setRTL} = useTheme();
  const styles = makeStyle(colors);
  const options: HomeOption[] = [
    {
      bigText: I18n.Home.quiz,
      smallText: I18n.Home.create,
      bgColor: '#FF7040',
      action: createQuiz,
    },
    {
      bigText: I18n.Home.quiz,
      smallText: I18n.Home.join,
      bgColor: '#47cc49',
      action: createQuiz,
    },
    // {
    //   bigText: I18n.Home.friend,
    //   smallText: I18n.Home.challenge,
    //   bgColor: '#3248da',
    //   action: createQuiz,
    // },
  ];

  const categories = DB.cats;

  const createQuiz = () => {};

  const toggleLang = () => {
    const lang = getActiveLang();
    if (lang === 'en') {
      setActiveLang('ar');
      // setLang('ar');
      setRTL(true);
    } else {
      setActiveLang('en');
      // setLang('en');
      setRTL(false);
    }
    setLangUpdated(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.content}>
        <ImageBackground
          style={styles.upperSec}
          source={require('../../../../assets/images/BGpattern.png')}>
          <View style={[styles.row, styles.header]}>
            <View style={styles.iconCont}>
              <Icon
                name="bells"
                as={AntDesign}
                size="5"
                style={styles.icon}
                onPress={toggleLang}
              />
            </View>
            <Image
              source={require('../../../../assets/images/logoWhite.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          {/* <View style={styles.welcomeCont}>
            <View style={styles.textCont}>
              <Text style={styles.welcomeText}>{I18n.Home.welBack}</Text>
            </View>
            <View style={styles.textCont}>
              <Text style={styles.userName}>Mohamed Khaled</Text>
            </View>
          </View> */}
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
          <Text style={styles.secTitle}>{I18n.Home.categories}</Text>
          <FlatList
            contentContainerStyle={styles.catList}
            data={categories}
            renderItem={({item}) => <CatCard item={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
