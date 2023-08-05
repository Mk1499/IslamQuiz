import React, {memo, useState, useEffect} from 'react';
import {ImageBackground, View, FlatList, RefreshControl} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './FriendRequests.screen.styles';
import I18n from '../../../translate';
import Header from '../../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../Components/Loading/Loading';
import {get} from '../../../Services/api-service';
import FriendRequest from '../../../Models/FriendRequest.model';
import {errorHandler} from '../../../Services/toast-service';
import FriendRequestRow from '../../../Components/FriendRequestRow/FriendRequestRow.comp';

function FriendRequests() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {goBack} = useNavigation();
  const [loading, setLoading] = useState<Boolean>(true);
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    getData();
  }, []);

  function getData(refresh = false) {
    let url = '/friend/pendingRequests';
    setRefreshing(refresh);
    get(url, true)
      .then(({data}) => {
        console.log('Pending : ', data);
        setRequests(data);
      })
      .catch(() => {
        errorHandler();
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  return (
    <ImageBackground
      source={require('../../../../assets/images/BGpattern.png')}
      style={styles.container}>
      <Header goBack={goBack} label={I18n.Screens.friendRequests} />
      <View style={styles.content}>
        <Loader isVisible={loading} />
        {!loading ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getData(true)}
                colors={[colors.primary]}
              />
            }
            data={requests}
            renderItem={({item}) => <FriendRequestRow item={item} />}
          />
        ) : null}
      </View>
    </ImageBackground>
  );
}

export default memo(FriendRequests);
