import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import GoogleLogo from '../../assets/images/icons/googleLogo.png';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../Config/Constants';
import I18n from '../translate';

type MyProps = {
  label: String;
  action: Function;
};

export function googleConfigure() {
  GoogleSignin.configure({
    webClientId:
      '838270858099-l6lbg19joo84917vga4ev0q43pqt3jk5.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
}

export function googleLogout() {
  const isSocial = GoogleSignin.isSignedIn();
  if (isSocial) {
    GoogleSignin.signOut();
  }
}

export async function googleLogin() {
  return new Promise(async (resolve, reject) => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    const hasPlayService = await GoogleSignin.hasPlayServices();
    console.log('Prev Signed : ', isSignedIn);
    console.log('has Play Ser : ', hasPlayService);
    if (isSignedIn) {
      const userData = await GoogleSignin.getCurrentUser();
      resolve(userData);
    } else {
      GoogleSignin.signIn()
        .then(userData => {
          console.log('us : ', userData);
          resolve(userData);
        })
        .catch(err => {
          console.log('g er: ', err);
          reject(err);
        });
    }
  });
}

export const GoogleSigninBtn = (props: MyProps) => {
  return (
    <TouchableOpacity style={styles.btnCont} onPress={props.action}>
      {/* <Icon style={styles.btnIcon} name="google" as={AntDesign} size="2xl" /> */}
      <Image source={GoogleLogo} style={styles.btnImg} resizeMode="contain" />
      <Text style={styles.btnText}>{I18n.SignIn.google}</Text>
    </TouchableOpacity>
  );
};

const {colors, fonts} = Constants;
const styles = StyleSheet.create({
  btnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // width: '70%',
    // backgroundColor: 'red',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(10),
    borderWidth: 1,
    borderRadius: 10,
  },
  btnImg: {
    height: moderateScale(40),
    maxWidth: '20%',
  },
  btnText: {
    color: colors.main,
    fontSize: moderateScale(15),
    fontFamily: fonts.med,
  },
});
