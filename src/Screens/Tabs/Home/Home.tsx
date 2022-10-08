import React from 'react';
import {View, Text, ImageBackground, ScrollView, FlatList} from 'react-native';
import makeStyle from './styles';
import {Icon, NativeBaseProvider} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeOption from '../../../Models/HomeOption.model';
import OptionCard from '../../../Components/OptionCard/OptionCard';
import I18n from '../../../translate';
import {useTheme} from '../../../Theme/ThemeProvider';

export default function Home() {
  const {colors} = useTheme();
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

  const createQuiz = () => {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.content}>
        <ImageBackground
          style={styles.upperSec}
          source={require('../../../../assets/images/pattern.png')}>
          <View style={[styles.row, styles.header]}>
            <NativeBaseProvider>
              <Icon name="bells" as={AntDesign} size="5" style={styles.icon} />
            </NativeBaseProvider>
          </View>
          <View style={styles.welcomeCont}>
            <Text style={styles.welcomeText}>{I18n.Home.welBack}</Text>
            <Text style={styles.userName}>Mohamed Khaled</Text>
          </View>
        </ImageBackground>
        <View style={styles.optionsListCont}>
          <FlatList
            contentContainerStyle={styles.optionsList}
            data={options}
            horizontal
            renderItem={({item}) => <OptionCard item={item} />}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.secTitle}>Lateast Quizes</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
