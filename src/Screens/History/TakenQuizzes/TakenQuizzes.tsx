import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ImageBackground,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Loading from '../../../Components/Loading/Loading';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './styles';
import User from '../../../Models/User.model';
import {get} from '../../../Services/api-service';
import {errorHandler} from '../../../Services/toast-service';
import I18n from '../../../translate';
import {useNavigation} from '@react-navigation/native';
import TakenQuizCard from '../../../Components/TakenQuizCard/TakenQuizCard';
import Submittion from '../../../Models/Submittion.model';

type MyProps = {
  user: User;
};

function TakenQuizzes({user}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Submittion[]>([]);
  const {addListener, navigate} = useNavigation();

  const gotoQuizAnswers = useCallback(
    (submittion: Submittion) => {
      navigate('QuizAnswers', {
        submit: submittion.submit,
      });
    },
    [navigate],
  );

  useEffect(() => {
    const unSubscribe = addListener('focus', () => {
      getQuizzes();
    });

    return unSubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getQuizzes(refresh = false) {
    console.log('Called');
    const url = `/submit/list/${user?._id}`;
    setRefreshing(refresh);
    get(url, true)
      .then(({data}) => {
        console.log('Q : ', data);
        setQuizzes(data);
      })
      .catch(err => {
        console.log('Get Quiz Err : ', err);
        errorHandler('');
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  function renderEmpty() {
    return (
      <View style={styles.emptyCont}>
        <Text style={styles.emptyMsg}>{I18n.EmptyMsg.noTakenQuizzes}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          onRefresh={() => getQuizzes(true)}
          refreshing={refreshing}
        />
      }>
      <ImageBackground
        source={require('../../../../assets/images/BGpattern.png')}
        style={styles.content}>
        {loading ? (
          <Loading isVisible={loading} />
        ) : (
          <FlatList
            data={quizzes}
            renderItem={({item}) => (
              <TakenQuizCard item={item} action={() => gotoQuizAnswers(item)} />
            )}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </ImageBackground>
    </ScrollView>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(React.memo(TakenQuizzes));
