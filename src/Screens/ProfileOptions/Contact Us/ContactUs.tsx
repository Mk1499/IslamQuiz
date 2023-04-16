import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './ContactUs.style';
import I18n from '../../../translate';
import Header from '../../../Components/Header/Header';
import {MyTextArea, MyButton} from '../../../Components/Native';
import {connect} from 'react-redux';
import ReduxState from '../../../Models/ReduxState';
import User from '../../../Models/User.model';
import {post} from '../../../Services/api-service';
import {errorHandler, showSuccess} from '../../../Services/toast-service';

type MyProps = {
  navigation: {
    goBack: Function;
  };
  user: User;
  fireConfig: any;
};

function ContactUs({navigation, user, fireConfig}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(false);

  function goBack() {
    navigation.goBack();
  }

  function submit() {
    const url = '/feedback/add';
    const body = {
      comment,
      user: user._id,
    };
    setLoading(true);
    post(url, body, true)
      .then(() => {
        showSuccess(I18n.SuccessMsg.feedbackSend);
        goBack();
      })
      .catch(() => {
        errorHandler();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <Header goBack={goBack} label={I18n.Screens.contactUs} />
        <View style={styles.content}>
          <Text style={styles.msg}>{I18n.ContactUs.msg}</Text>
          <MyTextArea
            onChange={setComment}
            placeholder={I18n.ContactUs.leaveMsg}
          />
          <View style={styles.btnCont}>
            <MyButton
              action={submit}
              processing={loading}
              style={styles.btn}
              label={I18n.ContactUs.send}
            />
          </View>
        </View>
        {fireConfig.showSocial !== false && (
          <View style={styles.socialCont}>
            <TouchableOpacity
              onPress={() => Linking.openURL(fireConfig.facebookURL)}>
              <Image
                style={styles.socialImg}
                source={require('../../../../assets/images/icons/facebook.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(fireConfig.instagramURL)}>
              <Image
                style={styles.socialImg}
                source={require('../../../../assets/images/icons/instagram.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.userData,
  fireConfig: state.fireConfig,
});

export default connect(mapStateToProps, {})(ContactUs);
