import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './QuizSuccess.styles';
import Modal from 'react-native-modal';
import MyButton from '../../Native/MyButton/MyButton';
import sadImg from '../../../../assets/images/icons/sad.png';
import happyImg from '../../../../assets/images/icons/happy.png';
import quizImg from '../../../../assets/images/icons/quiz.png';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import {showSuccess} from '../../../Services/toast-service';
import I18n from '../../../translate';
import Share from 'react-native-share';

type MyProps = {
  title: string;
  msg: string;
  img: string;
  btnText: string;
  btnAction: string;
  btnProcessing?: boolean;
  visible: boolean;
  code: String;
};

export default function QuizSuccessModal(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [copyIcon, setCopyIcon] = useState('copy');

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

  function copyCode() {
    Clipboard.setString(props.code);
    showSuccess(I18n.Modals.codeCopied);
    setCopyIcon('check');
    setTimeout(() => {
      setCopyIcon('copy');
    }, 2000);
  }

  function share() {
    Share.open({
      title: 'Quiz  NAme',
      message: `Please Copy Quiz Code " ${props.code} to Join Quiz on Mutanafeson`,
    });
  }

  return (
    <View style={styles.container}>
      <Modal isVisible={props?.visible} useNativeDriver={true}>
        <View style={styles.content}>
          {props?.img ? (
            <Image style={styles.image} source={switchImg(props?.img)} />
          ) : null}
          <Text style={styles.title}>{props?.title}</Text>
          <Text style={styles.msg}>{props?.msg}</Text>
          <View style={[styles.row, styles.rowCont]}>
            <Icon
              onPress={copyCode}
              style={styles.icon}
              name={copyIcon}
              as={Feather}
              size="xl"
            />
            <TextInput
              value={props.code}
              editable={false}
              style={styles.input}
            />
            <Icon
              style={styles.icon}
              name="share-2"
              as={Feather}
              size="xl"
              onPress={share}
            />
          </View>
          {/* <View style={styles.row}> */}
          <View style={styles.btnCont}>
            <MyButton
              label={props?.btnText}
              action={props?.btnAction}
              processing={props?.btnProcessing}
            />
          </View>
          {/* <View style={styles.btnCont}>
              <MyButton
                label={props?.btn2Text}
                action={props?.btn2Action}
                processing={props?.btn2Processing}
              />
            </View> */}
          {/* </View> */}
        </View>
      </Modal>
    </View>
  );
}
