import React from 'react';
import {ScrollView, ImageBackground, FlatList} from 'react-native';
import ProfileCard from '../../../Components/ProfileCard/ProfileCard';
import TabHeader from '../../../Components/TabHeader/TabHeader';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './Profile.styles';
import I18n from '../../../translate';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';
import Storage from '../../../Services/storage-service';
import StorageKeys from '../../../Config/StorageKeys';
import {googleLogout} from '../../../Services/social-service';
import OptionRowItem from '../../../Components/OptionRowItem/OptionRowItem';
import ProfileRowOption from '../../../Models/ProfileRowOption.model';

type MyProps = {
  user: User;
  logoutAction: Function;
  navigation: {
    replace: Function;
    navigate: Function;
  };
};

function Profile(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {user, navigation} = props;
  const options: ProfileRowOption[] = [
    {
      label: I18n.Profile.editProfile,
      imgIcon: require('../../../../assets/images/icons/edituser.png'),
      action: () => navToScreen('EditProfile'),
    },
    {
      label: I18n.Profile.changeLang,
      imgIcon: require('../../../../assets/images/icons/languages.png'),
      action: () => navToScreen('ChangeLanguage'),
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
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.content}>
        <TabHeader label={I18n.Screens.profile} />
        <ProfileCard
          name={user?.name}
          points={user?.points}
          email={user?.email}
          photo={user?.photo}
        />
        <FlatList
          contentContainerStyle={styles.optionsCont}
          data={options}
          renderItem={({item}) => <OptionRowItem item={item} />}
        />
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(Profile);
