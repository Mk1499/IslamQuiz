import React from 'react';
import {View, Text} from 'react-native';
import makeStyle from './styles';
import {MyImageBG} from '../Native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../Theme/ThemeProvider';

type MyProps = {
  id: Number;
  title: String;
  desc: String;
  cover: String;
  time: Number;
  date: Date;
};

export default function QuizCard({item}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    // <View style={styles.container}>
    //   <MyImageCover style={styles.cover} uri={item.cover} />
    //   <Text style={styles.name}>{item.title + item.id}</Text>
    // </View>
    <View style={styles.container}>
      <MyImageBG style={styles.cover} uri={item.cover}>
        <LinearGradient
          colors={['transparent', '#000']}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.name}>{item.title}</Text>
        </LinearGradient>
      </MyImageBG>
    </View>
  );
}
