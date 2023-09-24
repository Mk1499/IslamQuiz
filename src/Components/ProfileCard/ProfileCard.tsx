import React, {memo, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import MyImage from '../Native/MyImage/MyImage';
import makeStyle from './ProfileCard.style';
import I18n from '../../translate';
import {MyButton, MyText} from '../Native';
import Friendship from '../../Models/Friendship.model';
import {connect} from 'react-redux';
import {post} from '../../Services/api-service';
import {showError, showSuccess} from '../../Services/toast-service';

type MyProps = {
  name: String;
  photo: String;
  email: String;
  submissions: Number;
  points: Number;
  rank: Number;
  quote?: String;
  isLocked?: Boolean;
  friendship?: Friendship;
  isMine?: Boolean;
  userData?: User;
  currentUser: User;
};

function ProfileCard({
  name,
  photo,
  submissions,
  points,
  rank,
  email,
  quote,
  isLocked,
  friendship,
  isMine,
  userData,
  currentUser,
}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [friendData, setFriendData] = useState(friendship);
  const [processing, setProcessing] = useState(false);

  function sendFriendRequest() {
    const url = '/friend/add';
    const body = {
      userID: userData._id,
      userPushID: userData.deviceToken,
      userSenderName: currentUser.name,
      userSenderPhoto: currentUser.photo,
    };
    setProcessing(true);
    post(url, body, true)
      .then(({data}) => {
        showSuccess('تم ارسال طلب الصداقة');
        setFriendData(data.data);
      })
      .catch(err => {
        console.log('friend Req Err : ', err);
        showError();
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  function cancelFriendRequest() {
    const url = '/friend/remove';
    const body = {
      friendshipID: friendData?._id,
    };
    setProcessing(true);
    post(url, body, true)
      .then(() => {
        setFriendData();
      })
      .catch(err => {
        console.log('cancel friend req : ', err);
        showError();
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  function renderBtnLabel() {
    if (friendData) {
      switch (friendData.status) {
        case 'pending':
          return `${I18n.Global.cancel}  ${I18n.Profile.pendingRequest}`;
        case 'valid':
          return I18n.Profile.unfriend;
      }
    } else {
      return I18n.Profile.sendFriend;
    }
  }

  function handleBtnClick() {
    if (friendData?.status) {
      cancelFriendRequest();
    } else {
      sendFriendRequest();
    }
  }

  return (
    <View style={styles.container}>
      <MyImage style={styles.img} uri={photo} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{quote || email}</Text>
      {!isMine ? (
        <>
          <View style={styles.friendCont}>
            <MyButton
              label={renderBtnLabel()}
              style={styles.friendBtn}
              light={friendship}
              action={() => handleBtnClick()}
              processing={processing}
            />
          </View>
        </>
      ) : null}
      <View style={styles.dataCont}>
        <View style={styles.dataItem}>
          <Text style={styles.dataItemText}>
            {I18n.Profile.noOfSubmissions}
          </Text>
          <Text style={styles.dataItemTextValue}>{submissions || 0}</Text>
        </View>
        {!isLocked ? (
          <View style={styles.dataItem}>
            <Text style={styles.dataItemText}> {I18n.Profile.points}</Text>
            <Text style={styles.dataItemTextValue}>{points || 0}</Text>
          </View>
        ) : null}
        <View style={styles.dataItem}>
          <Text style={styles.dataItemText}> {I18n.Profile.rank}</Text>
          <Text style={styles.dataItemTextValue}>{rank || 0}</Text>
        </View>
      </View>
    </View>
  );
}
const mapStateToProps = (state: any) => ({
  currentUser: state.auth.userData,
});

export default connect(mapStateToProps, {})(memo(ProfileCard));
