import React from 'react';
import {View, Text, ImageBackground, ScrollView, FlatList} from 'react-native';
import makeStyle from './styles';
import {Icon, NativeBaseProvider} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeOption from '../../../Models/HomeOption.model';
import OptionCard from '../../../Components/OptionCard/OptionCard';
import I18n, {getActiveLang, setActiveLang} from '../../../translate';
import {useTheme} from '../../../Theme/ThemeProvider';
import DB from '../../../Config/DB';
import QuizCard from '../../../Components/QuizCard/QuizCard';

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
    {
      bigText: I18n.Home.friend,
      smallText: I18n.Home.challenge,
      bgColor: '#3248da',
      action: createQuiz,
    },
  ];
  const latestQuizes = DB.latestQuizes;

  const createQuiz = () => {};

  const toggleLang = () => {
    const lang = getActiveLang();
    if (lang === 'en') {
      setActiveLang('ar');
      setLang('ar');
      setRTL(true);
    } else {
      setActiveLang('en');
      setLang('en');
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
          // source={require('../../../../assets/images/pattern.png')}
        >
          <View style={[styles.row, styles.header]}>
            <View style={styles.iconCont}>
              <NativeBaseProvider>
                <Icon
                  name="bells"
                  as={AntDesign}
                  size="5"
                  style={styles.icon}
                  onPress={toggleLang}
                />
              </NativeBaseProvider>
            </View>
          </View>
          <View style={styles.welcomeCont}>
            <View style={styles.textCont}>
              <Text style={styles.welcomeText}>{I18n.Home.welBack}</Text>
            </View>
            <View style={styles.textCont}>
              <Text style={styles.userName}>Mohamed Khaled</Text>
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
          />
        </View>
        <View style={styles.section}>
          <View style={styles.textCont}>
            <Text style={styles.secTitle}>Lateast Quizes</Text>
          </View>
          <FlatList
            // contentContainerStyle={styles.optionsList}
            data={latestQuizes}
            horizontal
            renderItem={({item}) => <QuizCard item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
