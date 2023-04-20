import React, {memo} from 'react';
import {View, Text, ImageBackground, Image, Linking} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './UpdateApp.styles';
import I18n from '../../../translate';
import MyButton from '../../../Components/Native/MyButton/MyButton';
import {connect} from 'react-redux';
import {errorHandler} from '../../../Services/toast-service';

function UpdateApp({fireConfig}) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  function update() {
    if (fireConfig?.playStoreURL) {
      Linking.openURL(fireConfig.playStoreURL);
    } else {
      errorHandler('');
    }
  }

  return (
    <ImageBackground
      source={require('../../../../assets/images/BGpattern.png')}
      style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../../../assets/images/update.png')}
          style={styles.img}
        />
        <Text style={styles.msg}>{I18n.UpdateApp.msg}</Text>
      </View>
      <MyButton label={I18n.UpdateApp.update} action={update} />
    </ImageBackground>
  );
}

const mapStateToProps = (state: any) => ({
  fireConfig: state.fireConfig,
});

export default connect(mapStateToProps, {})(memo(UpdateApp));
