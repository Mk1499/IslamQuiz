import React, {memo} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import makeStyle from './styles';
import {MyImageBG} from '../Native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../Theme/ThemeProvider';
import QuizType from '../../Models/Quiz.model';
import {connect} from 'react-redux';
import User from '../../Models/User.model';
import {Icon} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import momnet from 'moment';
import I18n from '../../translate';

type MyItem = {
  quiz: QuizType;
  user: User;
  createdAt: Date;
  score: number;
  time: number;
};

type MyProps = {
  item: MyItem;
  action: Function;
};

function TakenQuizCard({item, action}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <MyImageBG style={styles.cover} uri={item?.quiz?.cover}>
        <LinearGradient
          colors={['transparent', colors?.primary]}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <View style={styles.dataCont}>
            <View style={styles.dataItem}>
              <Icon
                name="date"
                as={Fontisto}
                size="sm"
                style={styles.dataIcon}
              />
              <Text style={styles.dataText}>
                {momnet(item.createdAt).format('Do MMM YYYY')}
              </Text>
            </View>
            <View style={styles.dataItem}>
              <Icon
                name="coins"
                as={FontAwesome5}
                size="sm"
                style={styles.dataIcon}
              />
              <Text style={styles.dataText}>
                {item.score} {I18n.Quiz.points}
              </Text>
            </View>
            <View style={styles.dataItem}>
              <Icon
                name="time-slot"
                as={Entypo}
                size="sm"
                style={styles.dataIcon}
              />
              <Text style={styles.dataText}>
                {momnet.utc(item.time).format('mm:ss')} {I18n.Timer.minutes}
              </Text>
            </View>
          </View>
          <Text style={styles.desc} numberOfLines={2}>
            {item.quiz.description}
          </Text>
          <Text style={styles.name} numberOfLines={1}>
            {item.quiz.name}
          </Text>
        </LinearGradient>
      </MyImageBG>
    </TouchableOpacity>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(memo(TakenQuizCard));
