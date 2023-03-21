import React from 'react';
import {ScrollView, ImageBackground} from 'react-native';
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

type MyProps = {
  user: User;
  logoutAction: Function;
  navigation: {
    replace: Function;
  };
};

function Profile(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {user, navigation} = props;

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
        <TabHeader
          iconName="logout"
          label={I18n.Screens.profile}
          iconAction={logout}
        />
        <ProfileCard name={user?.name} points={user?.points} />
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(Profile);
