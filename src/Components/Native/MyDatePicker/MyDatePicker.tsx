import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './MyDatePicker.styles';
import DatePicker from 'react-native-date-picker';
import I18n from '../../../translate';
import moment from 'moment';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

type MyProps = {
  initialDate: Date;
  onChange: Function;
  label: string;
};

export default function MyDatePicker({label, initialDate, onChange}: MyProps) {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [date, setDate] = useState(initialDate || null);
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.dateCont}>
        {date ? (
          <Icon
            size="lg"
            name="closecircle"
            as={AntDesign}
            onPress={() => {
              setDate();
              onChange();
            }}
            color={colors.primary}
          />
        ) : (
          <Icon
            size="lg"
            name="calendar"
            as={AntDesign}
            onPress={() => setOpen(true)}
            color={colors.primary}
          />
        )}
        <Text style={styles.text}>
          {date ? moment(date).format('LLL') : label}
        </Text>
      </View>
      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        onConfirm={(d: Date) => {
          setOpen(false);
          setDate(d);
          onChange(d);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        confirmText={I18n.Global.confirm}
        cancelText={I18n.Global.cancel}
        title={I18n.CreateQuiz.selectDate}
        minimumDate={initialDate}
      />
    </View>
  );
}
