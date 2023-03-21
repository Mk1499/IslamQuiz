import React, {useEffect} from 'react';
import {View, Text, LogBox} from 'react-native';
import StorageKeys from '../../Config/StorageKeys';
import {
  configureAndroidPushNote,
  requestUserPermission,
} from '../../Services/firebase-service';
import Storage from '../../Services/storage-service';
import {setActiveLang} from '../../translate';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {setTokenAction} from '../../Redux/Actions/auth.action';

type MyProps = {
  navigation: {
    navigate: Function;
    replace: Function;
  };
  setTokenAction: Function;
};

function Landing(props: MyProps) {
  useEffect(() => {
    intializeApp();
  }, []);

  async function intializeApp() {
    LogBox.ignoreAllLogs(true);
    requestUserPermission();
    configureAndroidPushNote();

    const lang = await Storage.getItem(StorageKeys.userLang);
    const token = await Storage.getItem(StorageKeys.userToken);
    setActiveLang(lang || 'ar');
    if (token) {
      props.setTokenAction(token);
      props.navigation.replace('Tabs');
    } else {
      props.navigation.replace('Login');
    }
    SplashScreen.hide();
  }

  //   return (
  //     <View>
  //       <Text></Text>
  //     </View>
  //   );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {setTokenAction})(Landing);
