import {useEffect, memo} from 'react';
import {LogBox, Linking} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';

type MyProps = {
  navigation: {
    navigate: Function;
    replace: Function;
  };
  setTokenAction: Function;
};

function Landing(props: MyProps) {
  const {navigate} = useNavigation();

  useEffect(() => {
    intializeApp();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function intializeApp() {
    LogBox.ignoreAllLogs(true);
    linkingListener();
    await setupLinking();
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

  const linkingListener = () => {
    // console.log('Setup Deep Linking');
    Linking.addEventListener('url', ({url}) => {
      navigateHandler(url);
    });
  };

  const setupLinking = () => {
    Linking.getInitialURL().then(url => {
      try {
        navigateHandler(url);
      } catch (err) {
        console.error('ERR : ', err);
      }
    });
  };

  const navigateHandler = async (url: string) => {
    const paramsArr = url.split('/');
    const id = paramsArr.pop();
    const screen = paramsArr.pop();
    switch (screen) {
      case 'quiz':
        navigate('QuizIntro', {
          id,
        });
        break;
      case 'profile':
        navigate('UserProfile', {
          userID: id,
        });
        break;
    }
  };

  //   return (
  //     <View>
  //       <Text></Text>
  //     </View>
  //   );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {setTokenAction})(memo(Landing));
