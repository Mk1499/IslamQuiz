import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import Category from '../../../Models/Category';
import styles from './styles';

type MyProps = {
  item: Category;
};

export default class CategoryCard extends Component<MyProps, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    const {item} = this.props;
    if (item.img) {
      return (
        <View style={styles.container}>
          <Image source={item.img} style={styles.img} />
          <Text style={[styles.name,{color:item.color}]}> {item.name} </Text>
        </View>
      );
    } else {
      return null;
    }
  }
}
