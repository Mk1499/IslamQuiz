import React, {memo, useRef, useEffect, useState} from 'react';
import {View, ScrollView, ImageBackground} from 'react-native';
import makeStyle from './QuizIntro.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import GradientCover from '../../../Components/GradientCover/GradientCover';
import QuizType from '../../../Models/Quiz.model';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import Loading from '../../../Components/Loading/Loading';
import {get} from '../../../Services/api-service';
import {errorHandler} from '../../../Services/toast-service';
import QuizMetadata from '../../../Components/Quiz/QuizMetadata/QuizMetadata';
import {TabView, TabBar, TabBarProps} from 'react-native-tab-view';
import I18n from '../../../translate';
import Constants from '../../../Config/Constants';
import QuizRank from '../../../Components/Quiz/QuizRank/QuizRank';

type MyProps = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
  route: {
    params: {
      quiz: QuizType;
      id: string;
    };
  };
};

function QuizIntro(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {quiz, id} = props.route.params;
  const [quizData, setQuizData] = useState<QuizType>();
  const [loading, setLoading] = useState<Boolean>(true);
  const {width, height} = Constants;
  const [index, setIndex] = React.useState(1);

  const routes = [
    {key: 'rank', title: I18n.Quiz.rank},
    {key: 'info', title: I18n.Quiz.info},
  ];

  const ref = useRef();

  useEffect(() => {
    if (quiz) {
      setQuizData(quiz);
      setLoading(false);
    } else {
      getQuizData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getQuizData() {
    let url = `/quiz/metadata/${id}`;
    get(url)
      .then(({data}) => {
        setQuizData(data);
      })
      .catch(() => {
        errorHandler('');
        props.navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const goBack = () => {
    props.navigation.goBack();
  };

  const share = () => {
    const message = `
    اختبر معلوماتك وتنافس معي عبر تطبيق متنافسون، هل أنت جاهز؟
    https://iquizz.netlify.app/mobile/quiz-${quiz._id}
    `;
    captureRef(ref, {
      format: 'jpg',
      quality: 0.8,
    })
      .then(url => {
        console.log('UR : ', url);
        Share.open({
          message,
          url,
        });
      })
      .catch(err => {
        console.log('err : ', err);
      });
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'info':
        return <QuizMetadata quizData={quizData} />;
      case 'rank':
        return <QuizRank quizID={quizData?._id} />;
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/BGpattern.png')}
      style={styles.content}>
      {loading ? (
        <View style={styles.loadingCont}>
          <Loading isVisible={true} />
        </View>
      ) : (
        <ViewShot
          ref={ref}
          captureMode="mount"
          options={{fileName: 'Your-File-Name', format: 'jpg', quality: 0.9}}>
          <ScrollView style={styles.container}>
            <GradientCover
              onBack={goBack}
              coverURL={quizData.cover}
              title={quizData.name}
              description={quizData.description}
              onShare={share}
            />

            {/* <QuizMetadata quizData={quizData} /> */}
            <View
              style={{
                height: 0.6 * height,
              }}>
              <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: width, height: 2000}}
                style={styles.content}
                renderTabBar={(prop: TabBarProps) => (
                  <TabBar
                    {...prop}
                    style={styles.tabBarCont}
                    labelStyle={styles.tabBarlabel}
                    indicatorStyle={styles.indecator}
                  />
                )}
              />
            </View>
          </ScrollView>
        </ViewShot>
      )}
    </ImageBackground>
  );
}

export default memo(QuizIntro);
