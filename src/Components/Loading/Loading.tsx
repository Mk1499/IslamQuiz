import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './loading.style';

type MyProps = {
  isVisible: Boolean;
};

export default function Loading({isVisible}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  });

  if (isVisible) {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.img,
            {
              opacity,
            },
          ]}
          source={require('../../../assets/images/logo.png')}
        />
      </View>
    );
  } else {
    return <></>;
  }
}
