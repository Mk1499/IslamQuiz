import React from 'react';
import {Text} from 'react-native';
import makeStyle from './style';
import {useTheme} from '../../Theme/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import {MyImageBG} from '../Native';
import {View} from 'react-native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {getActiveLang} from '../../translate';

type MyProps = {
  coverURL: String;
  title: String;
  description: String;
  onBack: Function;
  onShare: Function;
};

export default function GradientCover({
  title,
  coverURL,
  onBack,
  description,
  onShare,
}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <MyImageBG uri={coverURL} style={styles.coverBGImg}>
      <LinearGradient
        colors={[colors.primary, 'transparent']}
        style={styles.linearGradient}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}>
        <View style={styles.row}>
          <Icon
            name={getActiveLang() === 'ar' ? 'left' : 'right'}
            as={AntDesign}
            onPress={onBack}
            size="xl"
            color="#fff"
            style={styles.icon}
          />
          {onShare ? (
            <Icon
              name={'share-2'}
              as={Feather}
              onPress={onShare}
              size="xl"
              color="#fff"
              style={styles.icon}
            />
          ) : null}
        </View>
        <View style={styles.detailsCont}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={4}>
            {description}
          </Text>
        </View>
      </LinearGradient>
    </MyImageBG>
  );
}
