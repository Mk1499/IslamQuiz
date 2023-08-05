import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import Modal from 'react-native-modal';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';

const {colors, fonts, width} = Constants;

export default function NetworkLoggerScreen() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.contianer}>
      <SafeAreaView style={styles.SafeAreaView}>
        <Modal visible={visible}>
          <View style={styles.header}>
            <Text>Network logs</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
          </View>
          <NetworkLogger />
        </Modal>
      </SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.text}>Logs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    width,
  },
  SafeAreaView: {flex: 1, backgroundColor: '#ededed', width},
  button: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    zIndex: 100,
    width: 50,
    height: 50,
    backgroundColor: colors.bg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  header: {
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: moderateVerticalScale(15),
    backgroundColor: colors.bg,
  },
  text: {
    fontFamily: fonts.bold,
  },
});
