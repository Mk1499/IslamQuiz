import React from 'react';
import {ScrollView, View} from 'react-native';
import AuthHead from '../../../Components/AuthHead/AuthHead';
import makeStyle from './styles';
import {useTheme} from '../../../Theme/ThemeProvider';

const Login = () => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <AuthHead />
      </View>
    </ScrollView>
  );
};

export default Login;
