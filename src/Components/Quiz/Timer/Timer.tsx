import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import makeStyle from './Timer.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type MyProps = {
  time: Number;
  handleFinish: Function;
  stop: boolean;
};

export default function Timer({time, handleFinish, stop}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [minutes, setMinutes] = useState(time);
  const [seconds, setSeconds] = useState(0);
  const interval = setTimeout(() => {
    countDown();
  }, 1000);

  useEffect(() => {
    if (stop) {
      stopCounting();
    }
  }, [stop, stopCounting]);

  function countDown() {
    if (seconds === 0 && minutes > 0) {
      setSeconds(59);
      setMinutes(minutes - 1);
    } else if (seconds > 0) {
      setSeconds(seconds - 1);
    } else if (seconds === 0 && minutes === 0) {
      handleFinish();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function stopCounting() {
    if (interval) {
      clearInterval(interval);
    }
  }

  function numFormatter(num: Number) {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  return (
    <View style={styles.container}>
      <Icon
        name="timer-outline"
        as={MaterialCommunityIcons}
        style={styles.icon}
        color="#fff"
      />
      <Text style={styles.text}>
        {numFormatter(minutes)}:{numFormatter(seconds)}
      </Text>
    </View>
  );
}
