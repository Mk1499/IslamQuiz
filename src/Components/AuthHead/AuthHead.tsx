import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {useTheme} from '../../Theme/ThemeProvider';

const AuthHead = () => {
  const {dark, setScheme} = useTheme();

  const toggleScheme = () => {
    if (dark) {
      setScheme('light');
    } else {
      setScheme('dark');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.brand}>IQuiz</Text>
        <View style={styles.dataCont}>
          <Text style={styles.title} onPress={toggleScheme}>Sign In</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Don't have an account?</Text>
            <Text style={[styles.text, styles.link]}>Sign Up</Text>
          </View>
        </View>
      </View>
      <View style={styles.firstExtend} />
      <View style={styles.secExtent} />
    </>
  );
};

export default AuthHead;
