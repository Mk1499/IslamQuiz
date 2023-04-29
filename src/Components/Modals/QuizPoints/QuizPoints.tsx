import React, {memo, useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './QuizPoints.style';
import Modal from 'react-native-modal';
import MyButton from '../../Native/MyButton/MyButton';
import sadImg from '../../../../assets/images/icons/sad.png';
import happyImg from '../../../../assets/images/icons/happy.png';
import quizImg from '../../../../assets/images/icons/quiz.png';
import logoImg from '../../../../assets/images/logo.png';
import I18n from '../../../translate';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';

type MyProps = {
  title: string;
  msg: string;
  img: string;
  btn1Text: string;
  btn1Action: string;
  btn1Processing?: boolean;
  btn2Text: string;
  btn2Action: string;
  btn2Processing?: boolean;
  visible: boolean;
  points: number;
  quizID: string;
};

function QuizPoints(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const ref = useRef();

  function switchImg(imgName: string) {
    switch (imgName) {
      case 'sad':
        return sadImg;
      case 'happy':
        return happyImg;
      case 'quiz':
        return quizImg;
    }
  }

  function shareScore() {
    const message = `
    اختبر معلوماتك وتنافس معي عبر تطبيق متنافسون، هل أنت جاهز؟
    https://iquizz.netlify.app/mobile/quiz-${props.quizID}
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
  }

  return (
    <View style={styles.container}>
      <Modal isVisible={props?.visible} useNativeDriver={true}>
        <ViewShot
          ref={ref}
          captureMode="mount"
          options={{fileName: 'IQuiz-Score', format: 'jpg', quality: 0.9}}>
          <View style={styles.content}>
            <Image source={logoImg} style={styles.logoImg} />
            {props?.img ? (
              <Image style={styles.image} source={switchImg(props?.img)} />
            ) : null}
            <Text style={styles.title}>{props?.title}</Text>
            <Text style={styles.msg}>{props?.msg}</Text>
            <View style={styles.pointsCont}>
              <Text style={styles.points}>{props.points}</Text>
            </View>
            <Text style={styles.pointsLabel}>{I18n.Global.points}</Text>
            <View style={styles.row}>
              <View style={styles.btnCont}>
                <MyButton
                  label={props?.btn1Text}
                  action={shareScore}
                  processing={props?.btn1Processing}
                  light={true}
                  activeOpacity={1}
                />
              </View>
              <View style={styles.btnCont}>
                <MyButton
                  label={props?.btn2Text}
                  action={props?.btn2Action}
                  processing={props?.btn2Processing}
                />
              </View>
            </View>
          </View>
        </ViewShot>
      </Modal>
    </View>
  );
}

export default memo(QuizPoints);
