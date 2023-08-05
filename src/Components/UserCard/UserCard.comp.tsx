import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './UserCard.comp.styles';
import {MyImage, MyText} from '../Native';
import User from '../../Models/User.model';
import I18n from '../../translate';
import {useNavigation} from '@react-navigation/native';

type MyProps = {
  user: User;
};

export default function UserCard({user}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {navigate} = useNavigation();

  function gotoProfile() {
    navigate('UserProfile', {
      user,
    });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={gotoProfile}>
      <View style={styles.imgCont}>
        <MyImage style={styles.img} uri={user.photo} />
      </View>
      <View style={styles.dataCont}>
        <MyText style={styles.name}>{user.name}</MyText>
        <View style={styles.row}>
          <MyText style={styles.rankLabel}>
            {' '}
            {`${I18n.Search.rank} : ${user.rank}`}{' '}
          </MyText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
