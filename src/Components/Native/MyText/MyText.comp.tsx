import React, {memo} from 'react';
import {Text, TextProps} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './MyText.comp.style';

type MyProps = TextProps & {
  value: string;
};

function MyText(props: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.value || props.children}
    </Text>
  );
}

export default memo(MyText);
