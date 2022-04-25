import React, {Component} from 'react';
import {View, Text, ScrollView, I18nManager, FlatList} from 'react-native';
import {connect} from 'react-redux';
import MainHeader from '../../../Components/Header/Main/MainHeader';
import styles from './style';
import I18n from '../../../../Services/Translate/index';
import OptionCard from '../../../Components/Home/OptionCard/OptionCard';
import HomeOption from '../../../Models/HomeOption';
import LinearGradient from 'react-native-linear-gradient';
import {mainColor} from '../../../Config/global';

type MyState = {
  options: HomeOption[];
};

type MyProps = {};

export class Home extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          name: I18n.t('Home.createQuiz'),
          color1: '#ff8d71',
          color2: '#ff5775',
        },
        {
          name: I18n.t('Home.joinQuiz'),
          color1: '#5862ff',
          color2: '#4fa4ff',
        },
        {
          name: I18n.t('Home.challengeFriend'),
          color1: '#1ab092',
          color2: '#72df9c',
        },
        {
          name: I18n.t('Home.randomQuiz'),
          color1: '#fecf40',
          color2: '#e7cc7a',
        },
      ],
    };
  }

  componentDidMount() {}

  render() {
    const {options} = this.state;

    return (
      <ScrollView>
        <LinearGradient colors={[mainColor, '#465adf']} style={styles.topCont}>
          <MainHeader />
          <View style={styles.welCont}>
            <Text style={styles.welText}>{I18n.t('Home.welcomeBack')}</Text>
            <Text style={styles.name}>محمد خالد</Text>
          </View>
        </LinearGradient>
        <View style={styles.optionsList}>
          <FlatList
            data={options}
            horizontal
            renderItem={({item, index}) => <OptionCard item={item} />}
            keyExtractor={(item, index) => `option-Num ${index}`}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            <View style={styles.secHeadCont}>
              <Text style={styles.secTitle}>الأقسام</Text>
              <Text style={styles.viewAll}>أظهر الكل</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
