import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import MyImage from '../Native/MyImage/MyImage';
import makeStyle from './ProfileCard.style';
import I18n from '../../translate';

type MyProps = {
  name: String;
  photo: String;
  email: String;
  submissions: Number;
  points: Number;
  rank: Number;
};

export default function ProfileCard({
  name,
  photo,
  submissions,
  points,
  rank,
  email,
}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <View style={styles.container}>
      <MyImage style={styles.img} uri={photo} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.dataCont}>
        <View style={styles.dataItem}>
          <Text style={styles.dataItemText}>
            {I18n.Profile.noOfSubmissions}
          </Text>
          <Text style={styles.dataItemText}>{submissions || 0}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataItemText}> {I18n.Profile.points}</Text>
          <Text style={styles.dataItemText}>{points || 0}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataItemText}> {I18n.Profile.rank}</Text>
          <Text style={styles.dataItemText}>{rank || 0}</Text>
        </View>
      </View>
    </View>
  );
}
