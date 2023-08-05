import React, {useState, useEffect} from 'react';
import {ImageBackground, View, FlatList, RefreshControl} from 'react-native';
import {MyText} from '../../../../Components/Native';
import {useTheme} from '../../../../Theme/ThemeProvider';
import makeStyle from './SearchUsers.screen.styles';
import Header from '../../../../Components/Header/Header';
import I18n from '../../../../translate';
import {useRoute} from '@react-navigation/core';
import User from '../../../../Models/User.model';
import UserRow from '../../../../Components/LoeaderBoard/UserRow/UserRow';
import {get} from '../../../../Services/api-service';
import Loading from '../../../../Components/Loading/Loading';
import {errorHandler} from '../../../../Services/toast-service';
import {connect} from 'react-redux';

type MyProps = {
  user: User;
};

function SearchUsersScreen({user}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {params} = useRoute();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [refreshing, setRefreshing] = useState<Boolean>(false);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function getUsers(refresh = false) {
    let url = `/search/users/${params.query}`;
    setRefreshing(refresh);
    get(url)
      .then(({data}) => {
        const filteredUsers = data.filter(u => u._id !== user._id);
        setUsers(filteredUsers);
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
      source={require('../../../../../assets/images/BGpattern.png')}
      style={[styles.container]}>
      <Header />
      <View style={styles.content}>
        <MyText style={styles.title}>
          {I18n.Search.userResults}
          <MyText style={styles.query}>{` ${params.query}`}</MyText>
        </MyText>
        {loading ? (
          <Loading isVisible={loading} />
        ) : (
          <FlatList
            data={users}
            renderItem={({item}) => <UserRow user={item} hideRank />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getUsers(true)}
                colors={[colors.primary]}
              />
            }
          />
        )}
      </View>
    </ImageBackground>
  );
}

const mapStateToProps = state => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(SearchUsersScreen);
