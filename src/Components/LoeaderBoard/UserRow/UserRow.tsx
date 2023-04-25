import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import User from '../../../Models/User.model';
import {useTheme} from '../../../Theme/ThemeProvider';
import MyImage from '../../Native/MyImage/MyImage';
import makeStyle from './UserRow.styles';
import {connect} from 'react-redux';
import I18n from '../../../translate';

type myProps = {
  user: User;
  currentUser: User;
};

function UserRow({user, currentUser}: myProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  function renderPrizeIcon() {
    switch (user.rank) {
      case 1:
        return (
          <Image
            source={require('../../../../assets/images/icons/goldMedal.png')}
            style={styles.prizeIcon}
          />
        );
      case 2:
        return (
          <Image
            source={require('../../../../assets/images/icons/silverMedal.png')}
            style={styles.prizeIcon}
          />
        );
      case 3:
        return (
          <Image
            source={require('../../../../assets/images/icons/pronzMedal.png')}
            style={styles.prizeIcon}
          />
        );
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => user.action && user.action()}
      activeOpacity={1}>
      <View style={styles.iconCont}>
        <Text style={styles.rank}>{user.rank}</Text>
        <MyImage uri={user.photo} style={styles.icon} />
        <View style={styles.dataCont}>
          <View>
            <View style={styles.row}>
              <Text
                style={
                  user._id === currentUser._id
                    ? styles.labelActive
                    : styles.label
                }>
                {user.name}
              </Text>
              {renderPrizeIcon()}
            </View>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.pointsCont}>
        <Text style={styles.points}>{user.points}</Text>
        <Text style={styles.pointLabel}>{I18n.Quiz.points}</Text>
      </View>
      {/* <TouchableOpacity style={styles.arrowCont}> */}
      {/* <Icon
        style={styles.arrow}
        as={AntDesign}
        name={getActiveLang() === 'en' ? 'right' : 'left'}
      /> */}
      {/* </TouchableOpacity> */}
    </TouchableOpacity>
  );
}

const mapStateToProps = (state: any) => ({
  currentUser: state.auth.userData,
});

export default connect(mapStateToProps, {})(React.memo(UserRow));
