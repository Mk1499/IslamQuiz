import React, {memo, useState} from 'react';
import {View} from 'react-native';
import FriendRequest from '../../Models/FriendRequest.model';
import {useTheme} from '../../Theme/ThemeProvider';
import {MyImage, MyText, MyButton} from '../Native';
import makeStyle from './FriendRequestRow.comp.styles';
import moment from 'moment';
import I18n from '../../translate';
import {post} from '../../Services/api-service';

type MyProps = {
  item: FriendRequest;
  action: Function;
};

function FriendRequestRow({item, action}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [request, setRequest] = useState<FriendRequest>(item);

  async function accept() {
    const newReq: FriendRequest = request;
    const url = '/friend/accept';
    const body = {
      friendshipID: request._id,
    };
    newReq.status = 'valid';
    setRequest({...newReq});
    action('valid');
    await post(url, body, true);
    // alert(request.status);
  }

  async function refuse() {
    const newReq: FriendRequest = request;
    const url = '/friend/remove';
    const body = {
      friendshipID: request._id,
    };
    newReq.status = 'cancelled';
    setRequest({...newReq});
    action('cancelled');
    await post(url, body, true);
  }

  return (
    <View style={styles.cardCont}>
      <View style={styles.dataCont}>
        <MyImage style={styles.img} uri={request.from.photo} />
        <View style={styles.textCont}>
          <MyText style={styles.label}>{request.from.name}</MyText>
          <MyText style={styles.date}>
            {moment(request.createdAt).fromNow()}
          </MyText>
        </View>
      </View>
      {request.status === 'valid' ? (
        <MyText style={styles.labelMsg}>{I18n.Profile.friend}</MyText>
      ) : request.status === 'cancelled' ? (
        <MyText style={styles.labelMsg}>{I18n.Global.cancelled}</MyText>
      ) : (
        <View style={styles.btnsCont}>
          <MyButton
            label={I18n.Global.accept}
            style={styles.btn}
            labelStyle={styles.btnLabel}
            action={accept}
          />
          <MyButton
            label={I18n.Global.refuse}
            light
            style={styles.btn}
            labelStyle={styles.btnLabel}
            action={refuse}
          />
        </View>
      )}
    </View>
  );
}

export default memo(FriendRequestRow);
