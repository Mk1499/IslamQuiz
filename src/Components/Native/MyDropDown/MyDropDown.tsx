import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View} from 'react-native';
import {Select} from 'native-base';
import Constants from '../../../Config/Constants';
import {StyleProps} from 'react-native-reanimated';

const {colors, fonts} = Constants;

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
};

export default forwardRef(function MyDropDown(props: MyProps, ref) {
  const [service, setService] = useState('');

  useImperativeHandle(ref, () => ({
    clear() {
      setService('');
    },
  }));

  return (
    <View style={props.style}>
      <Select
        selectedValue={service}
        minWidth="200"
        accessibilityLabel={props.placeholder}
        placeholder={props.placeholder}
        fontFamily={fonts.med}
        fontSize={15}
        _selectedItem={{
          bg: colors.bg,
          //   endIcon: <CheckIcon size="5" />,
        }}
        // mt={1}
        borderColor={colors.bg}
        borderRadius="xl"
        onValueChange={itemValue => {
          setService(itemValue);
          props.onChange(itemValue);
        }}>
        {props.options?.map(option => (
          <Select.Item
            label={option.label}
            value={option.value}
            alignItems="center"
            fontFamily={fonts.med}
            key={option.value}
          />
        ))}
      </Select>
    </View>
  );
});
