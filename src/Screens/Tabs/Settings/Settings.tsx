import React, {memo} from 'react';
import {
  ScrollView,
  ImageBackground,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import TabHeader from '../../../Components/TabHeader/TabHeader';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './Settings.styles';
import I18n from '../../../translate';
import {connect} from 'react-redux';
import Storage from '../../../Services/storage-service';
import StorageKeys from '../../../Config/StorageKeys';
import {googleLogout} from '../../../Services/social-service';
import OptionRowItem from '../../../Components/OptionRowItem/OptionRowItem';
import ProfileRowOption from '../../../Models/ProfileRowOption.model';
import {syncUserData} from '../../../Redux/Actions/auth.action';
import {friends} from '../../../../assets/images';
import screenNames from '../../../Routes/Stacks/screenNames';

type MyProps = {
  logoutAction: Function;
  navigation: {
    replace: Function;
    navigate: Function;
  };
  syncUserData: Function;
  syncingData: Boolean;
};

function Settings(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {navigation} = props;

  const options: ProfileRowOption[] = [
    {
      label: I18n.Profile.editProfile,
      imgIcon: require('../../../../assets/images/icons/edituser.png'),
      action: () => navToScreen('EditProfile'),
    },
    {
      label: I18n.Profile.friendRequests,
      imgIcon: friends,
      action: () => navToScreen(screenNames.friendRequests),
    },
    {
      label: I18n.Profile.changeLang,
      imgIcon: require('../../../../assets/images/icons/languages.png'),
      action: () => navToScreen('ChangeLanguage'),
    },
    {
      label: `${I18n.Home.create} ${I18n.Home.quiz} ${I18n.Home.private}`,
      imgIcon: require('../../../../assets/images/icons/exam.png'),
      action: () => navToScreen('CreateQuiz'),
    },
    {
      label: `${I18n.Home.join} ${I18n.Home.quiz} ${I18n.Home.private}`,
      imgIcon: require('../../../../assets/images/icons/join.png'),
      action: () => navToScreen('JoinQuiz'),
    },
    {
      label: I18n.Profile.changeTheme,
      imgIcon: require('../../../../assets/images/icons/changeTheme.png'),
      action: () => navToScreen('ChangeTheme'),
    },
    {
      label: I18n.Profile.contactUs,
      imgIcon: require('../../../../assets/images/icons/contactForm.png'),
      action: () => navToScreen('ContactUs'),
    },
    {
      label: I18n.Profile.logout,
      imgIcon: require('../../../../assets/images/icons/logout.png'),
      action: logout,
    },
  ];

  function navToScreen(screenName: String) {
    props.navigation.navigate(screenName);
  }

  function logout() {
    Storage.removeItem(StorageKeys.userToken);
    googleLogout();
    navigation.replace('Login');
  }

  return (
    <SafeAreaView style={{backgroundColor: colors.primary}}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={props?.syncingData}
            onRefresh={() => props.syncUserData(props.user?._id)}
          />
        }>
        <ImageBackground
          source={require('../../../../assets/images/BGpattern.png')}
          style={styles.content}>
          <TabHeader label={I18n.Screens.setting} />

          <FlatList
            contentContainerStyle={styles.optionsCont}
            data={options}
            renderItem={({item}) => <OptionRowItem item={item} />}
            style={styles.list}
          />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
  syncingData: state.auth.syncingUserData,
});

export default connect(mapStateToProps, {syncUserData})(memo(Settings));
