import React, {useState, memo} from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './EditProfile.style';
import I18n from '../../../translate';
import Header from '../../../Components/Header/Header';
import {MyButton, MyInput} from '../../../Components/Native';
import {connect} from 'react-redux';
import ReduxState from '../../../Models/ReduxState';
import User from '../../../Models/User.model';
import {put} from '../../../Services/api-service';
import {errorHandler, showSuccess} from '../../../Services/toast-service';
import MyImage from '../../../Components/Native/MyImage/MyImage';
import {chooseImg} from '../../../Services/file-service';
import {uploadImage} from '../../../Services/firebase-service';
import {setTokenAction, syncUserData} from '../../../Redux/Actions/auth.action';

type MyProps = {
  navigation: {
    goBack: Function;
  };
  user: User;
  setTokenAction: Function;
  syncUserData: Function;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
function ContactUs({navigation, user, setTokenAction, syncUserData}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [photoURL, setPhotoURL] = useState(user.photo);
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false);
  const [photoUpdated, setPhotoUpdated] = useState(false);

  function goBack() {
    navigation.goBack();
  }

  async function submit() {
    setLoading(true);
    if (photoUpdated) {
      uploadImage(photo)
        .then(imgURL => {
          updateProfile(imgURL);
        })
        .catch(() => {
          errorHandler();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      updateProfile();
    }
  }

  function updateProfile(ph = photoURL) {
    const url = '/user/update';
    const body = {
      photo: ph,
      name,
    };
    put(url, body)
      .then(({data}) => {
        setTokenAction(data.token);
        showSuccess(I18n.SuccessMsg.profileUpdated);
        syncUserData(user._id);
        goBack();
      })
      .catch(err => {
        console.log('update profile err : ', err);
        errorHandler();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function pickImage() {
    chooseImg()
      .then(data => {
        setPhotoURL(data[0].uri);
        setPhoto(data[0]);
        setPhotoUpdated(true);
      })
      .catch(() => {
        errorHandler();
      });
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.container}>
        <Header goBack={goBack} label={I18n.Screens.editProfile} />
        <View style={styles.content}>
          {/* <Text style={styles.msg}>{I18n.ContactUs.msg}</Text> */}
          <TouchableOpacity onPress={pickImage}>
            <MyImage
              style={styles.img}
              uri={photoURL}
              isStatic={photoUpdated}
            />
          </TouchableOpacity>

          <MyInput
            placeholder={I18n.EditProfile.enterUsername}
            value={name}
            onChange={setName}
            style={styles.input}
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
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {setTokenAction, syncUserData})(
  memo(ContactUs),
);
