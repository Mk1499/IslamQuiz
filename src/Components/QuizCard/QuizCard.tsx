import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import makeStyle from './styles';
import {MyImageBG} from '../Native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../Theme/ThemeProvider';

type MyItem = {
  id: Number;
  name: String;
  desc: String;
  cover: String;
  time: Number;
  date: Date;
};

type MyProps = {
  item: MyItem;
  action: Function;
};

export default function QuizCard({item, action}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <MyImageBG style={styles.cover} uri={item.cover}>
        <LinearGradient
          colors={['transparent', colors?.primary]}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.name}>{item.name}</Text>
        </LinearGradient>
      </MyImageBG>
    </TouchableOpacity>
  );
}
