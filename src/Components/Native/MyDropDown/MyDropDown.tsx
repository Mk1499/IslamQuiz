import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Constants from '../../../Config/Constants';
import {StyleProps} from 'react-native-reanimated';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTheme} from '../../../Theme/ThemeProvider';

const {fonts} = Constants;

type MyProps = {
  label: String;
  placeholder: String;
  options: [
    {
      label: String;
      value: String;
    },
  ];
  onChange: Function;
  style: StyleProps;
  zIndex: number;
};

export default forwardRef(function MyDropDown(props: MyProps, ref) {
  const [service, setService] = useState('');
  const [open, setOpen] = useState(false);
  const {colors} = useTheme();

  useImperativeHandle(ref, () => ({
    clear() {
      setService('');
    },
  }));

  return (
    <DropDownPicker
      zIndex={props.zIndex}
      open={open}
      value={service}
      items={props.options}
      setOpen={setOpen}
      badgeColors="red"
      setValue={itemValue => {
        setService(itemValue);
        props.onChange(itemValue);
      }}
      style={[
        props.style,
        {
          borderColor: Constants.colors.main,
          backgroundColor: colors.bg,
        },
      ]}
      placeholder={props.placeholder}
      placeholderStyle={{
        color: colors.text,
      }}
      containerStyle={{
        zIndex: props.zIndex,
        borderColor: colors.bg,
        // backgroundColor: colors.bg,
      }}
      textStyle={{
        fontFamily: fonts.med,
      }}
      listItemContainerStyle={{
        backgroundColor: colors.bg,
      }}
      listParentLabelStyle={{
        color: colors.text,
      }}
      // containerProps={{}}
      // setItems={setItems}
    />
  );

  // return (
  //   <View style={props.style}>
  //     <Select
  //       selectedValue={service}
  //       minWidth="200"
  //       accessibilityLabel={props.placeholder}
  //       placeholder={props.placeholder}
  //       fontFamily={fonts.med}
  //       fontSize={15}
  //       _selectedItem={{
  //         bg: colors.bg,
  //         //   endIcon: <CheckIcon size="5" />,
  //       }}
  //       // mt={1}
  //       borderColor={colors.bg}
  //       borderRadius="xl"
  //       onValueChange={itemValue => {
  //         setService(itemValue);
  //         props.onChange(itemValue);
  //       }}>
  //       {props.options?.map(option => (
  //         <Select.Item
  //           label={option.label}
  //           value={option.value}
  //           alignItems="center"
  //           fontFamily={fonts.med}
  //           key={option.value}
  //         />
  //       ))}
  //     </Select>
  //   </View>
  // );
});
