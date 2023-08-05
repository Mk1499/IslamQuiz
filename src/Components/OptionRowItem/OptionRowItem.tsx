import {Icon} from 'native-base';
import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '../../Theme/ThemeProvider';
import makeStyle from './OptionRowItem.style';
import ProfileRowOption from '../../Models/ProfileRowOption.model';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getActiveLang} from '../../translate';

type MyProps = {
  item: ProfileRowOption;
};

function OptionRowItem({item}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => item.action && item.action()}>
      <View style={styles.iconCont}>
        <Image
          style={styles.icon}
          source={item.imgIcon}
          resizeMode={'contain'}
        />
        <Text style={styles.label}>{item.label}</Text>
      </View>
      {/* <TouchableOpacity style={styles.arrowCont}> */}
      <Icon
        style={styles.arrow}
        as={AntDesign}
        name={getActiveLang() === 'en' ? 'right' : 'left'}
      />
      {/* </TouchableOpacity> */}
    </TouchableOpacity>
  );
}

export default memo(OptionRowItem);
