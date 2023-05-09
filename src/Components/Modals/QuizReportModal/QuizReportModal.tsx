import React, {memo, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './QuizReportModal.style';
import Modal from 'react-native-modal';
import MyButton from '../../Native/MyButton/MyButton';
import sadImg from '../../../../assets/images/icons/sad.png';
import happyImg from '../../../../assets/images/icons/happy.png';
import quizImg from '../../../../assets/images/icons/quiz.png';
import {TextArea} from 'native-base';

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
};

function MultiModal(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [report, setReport] = useState<String>('');

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

  return (
    <View style={styles.container}>
      <Modal isVisible={props?.visible} useNativeDriver={true}>
        <View style={styles.content}>
          {props?.img ? (
            <Image style={styles.image} source={switchImg(props?.img)} />
          ) : null}
          <Text style={styles.title}>{props?.title}</Text>
          {/* <Text style={styles.msg}>{props?.msg}</Text> */}
          <View style={styles.textAreaCont}>
            <TextArea
              style={styles.textArea}
              onChangeText={t => setReport(t)}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.btnCont}>
              <MyButton
                label={props?.btn1Text}
                action={props?.btn1Action}
                processing={props?.btn1Processing}
                light={true}
              />
            </View>
            <View style={styles.btnCont}>
              <MyButton
                label={props?.btn2Text}
                action={() => props?.btn2Action(report)}
                processing={props?.btn2Processing}
                disabled={!report}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default memo(MultiModal);
