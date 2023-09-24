import React, {useState, useEffect, memo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, FlatList} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './UserFreiends.screen.styles';
import QuizType from '../../../Models/Quiz.model';
import I18n from '../../../translate';
import Header from '../../../Components/Header/Header';
import {get} from '../../../Services/api-service';
import {errorHandler} from '../../../Services/toast-service';
import Loading from '../../../Components/Loading/Loading';
import UserRow from '../../../Components/LoeaderBoard/UserRow/UserRow';
import {connect} from 'react-redux';
import User from '../../../Models/User.model';

type MyProps = {
  activeUser: User;
};

function UserFriendsScreen({activeUser}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {params} = useRoute();
  const [friends, setFriends] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const {goBack} = useNavigation();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function getData() {
    let url = `/friend/list/${params.userID}`;
    get(url)
      .then(({data}) => {
        const fArr = data?.filter(i => i._id !== activeUser._id);
        setFriends(fArr);
      })
      .catch(() => {
        errorHandler();
        goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Header label={`${I18n.Profile.friends}  ${params.userName}`} />
      {loading ? (
        <View style={styles.loaderCont}>
          <Loading isVisible={loading} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listCont}
          data={friends}
          renderItem={({item}) => <UserRow user={item} hideRank />}
        />
      )}
    </View>
  );
}

const mapStateToProps = state => ({
  activeUser: state.auth.userData,
});

export default connect(mapStateToProps, {})(memo(UserFriendsScreen));
