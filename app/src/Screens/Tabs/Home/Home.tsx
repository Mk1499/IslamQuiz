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
import Category from '../../../Models/Category';
import CategoryCard from '../../../Components/Shared/CategoryCard/CategoryCard';
import localImgs from '../../../Config/localImgs';
import DB from '../../../Config/DB';

type MyState = {
  options: HomeOption[];
  sections: Category[];
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
      sections: DB.sections,
    };
  }

  componentDidMount() {}

  showAllCats = () => {
    this.props.navigation.navigate('Catogries');
  };

  render() {
    const {options, sections} = this.state;

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
              <Text style={styles.secTitle}>{I18n.t('Home.sections')}</Text>
              <Text style={styles.viewAll} onPress={this.showAllCats}>
                {I18n.t('Shared.viewAll')}
              </Text>
            </View>
            <FlatList
              data={sections}
              renderItem={({item}) => <CategoryCard item={item} />}
              keyExtractor={(item, index) => `section-${index}`}
              numColumns={2}
              contentContainerStyle={styles.categriesList}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
