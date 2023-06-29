import React, {memo} from 'react';
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
  quote?: String;
  isLocked?: Boolean;
};

function ProfileCard({
  name,
  photo,
  submissions,
  points,
  rank,
  email,
  quote,
  isLocked,
}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <View style={styles.container}>
      <MyImage style={styles.img} uri={photo} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{quote || email}</Text>
      <View style={styles.dataCont}>
        <View style={styles.dataItem}>
          <Text style={styles.dataItemText}>
            {I18n.Profile.noOfSubmissions}
          </Text>
          <Text style={styles.dataItemTextValue}>{submissions || 0}</Text>
        </View>
        {!isLocked ? (
          <View style={styles.dataItem}>
            <Text style={styles.dataItemText}> {I18n.Profile.points}</Text>
            <Text style={styles.dataItemTextValue}>{points || 0}</Text>
          </View>
        ) : null}
        <View style={styles.dataItem}>
          <Text style={styles.dataItemText}> {I18n.Profile.rank}</Text>
          <Text style={styles.dataItemTextValue}>{rank || 0}</Text>
        </View>
      </View>
    </View>
  );
}

export default memo(ProfileCard);
