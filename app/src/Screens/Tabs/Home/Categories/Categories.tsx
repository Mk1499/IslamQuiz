import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../../../../Components/Header/ScreenHeader/ScreenHeader';
import {mainColor} from '../../../../Config/global';
import styles from './style';
import I18n from 'i18n-js';
import Category from '../../../../Models/Category';
import CategoryCard from '../../../../Components/Shared/CategoryCard/CategoryCard';
import DB from '../../../../Config/DB';

type MyProps = {};
type MyState = {
  sections: Category[];
};

export default class Categories extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      sections: DB.sectionsAll,
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {sections} = this.state;

    return (
      <ScrollView style={styles.container}>
        <LinearGradient colors={[mainColor, '#465adf']} style={styles.topCont}>
          <ScreenHeader
            screenName={I18n.t('Screens.chooseSection')}
            goBack={this.goBack}
          />
        </LinearGradient>
        <View style={styles.listCont}>
          <FlatList
            data={sections}
            renderItem={({item}) => <CategoryCard item={item} />}
            keyExtractor={(item, index) => `section-${index}`}
            numColumns={2}
            contentContainerStyle={styles.list}
            scrollEnabled={false}
            
          />
        </View>
      </ScrollView>
    );
  }
}
