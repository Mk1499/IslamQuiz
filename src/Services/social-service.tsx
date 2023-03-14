import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
      <Icon style={styles.btnIcon} name="google" as={AntDesign} size="2xl" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    color: '#4285F4',
  },
});
