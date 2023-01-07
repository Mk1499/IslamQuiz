import React from 'react';
import {Text} from 'react-native';
import makeStyle from './style';
import {useTheme} from '../../Theme/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import {MyImageBG} from '../Native';
import {View} from 'react-native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getActiveLang} from '../../translate';

type MyProps = {
  coverURL: String;
  title: String;
  description: String;
  onBack: Function;
};

export default function GradientCover({
  title,
  coverURL,
  onBack,
  description,
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
        <Icon
          name={getActiveLang() === 'ar' ? 'left' : 'right'}
          as={AntDesign}
          onPress={onBack}
          size="xl"
          color="#fff"
          style={styles.icon}
        />
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
