import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './SingleModal.style';
import Modal from 'react-native-modal';
import MyButton from '../../Native/MyButton/MyButton';
import sadImg from '../../../../assets/images/icons/sad.png';
import happyImg from '../../../../assets/images/icons/happy.png';
import timeImg from '../../../../assets/images/icons/time.png';

type MyProps = {
  title: string;
  msg: string;
  img: string;
  btnText: string;
  btnAction: string;
  visible: boolean;
  btnProcessing?: boolean;
};

export default function SingleModal(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  function switchImg(imgName: string) {
    switch (imgName) {
      case 'sad':
        return sadImg;
      case 'happy':
        return happyImg;
      case 'time':
        return timeImg;
    }
  }

  return (
    <View style={styles.container}>
      <Modal isVisible={props.visible} useNativeDriver={true}>
        <View style={styles.content}>
          {props.img ? (
            <Image
              resizeMode="contain"
              style={styles.image}
              source={switchImg(props.img)}
            />
          ) : null}
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.msg}>{props.msg}</Text>
          <MyButton
            label={props.btnText}
            action={props.btnAction}
            processing={props.btnProcessing}
          />
        </View>
      </Modal>
    </View>
  );
}
