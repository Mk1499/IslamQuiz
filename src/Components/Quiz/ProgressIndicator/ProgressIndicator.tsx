import React from 'react';
import {View} from 'react-native';
import makeStyle from './ProgressIndicator.style';
import {useTheme} from '../../../Theme/ThemeProvider';

type MyProps = {
  noOfQuestions: Number;
  activeIndex: Number;
};

export default function ProgressIndicator({
  activeIndex,
  noOfQuestions,
}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      {Array(noOfQuestions)
        .fill(0)
        .map((item, index) => {
          return (
            <View
              style={index <= activeIndex ? styles.activeItem : styles.item}
            />
          );
        })}
    </View>
  );
}
