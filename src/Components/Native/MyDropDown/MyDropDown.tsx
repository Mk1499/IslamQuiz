import React, {useState} from 'react';
import {View} from 'react-native';
import {Select} from 'native-base';
import Constants from '../../../Config/Constants';

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
};

export default function MyDropDown(props: MyProps) {
  const [service, setService] = useState('');
  return (
    <View>
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
}
