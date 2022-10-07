/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import Constants from '../../Config/Constants';
import { getActiveLang } from '../../translate';

const { colors, fonts, width, height } = Constants;

const makeStyle = (themeColors: any) => StyleSheet.create({
    container: {
        marginVertical: 0.005 * Constants.height,
    },
    label: {
        // color: themeColors.text,
        color: colors.main,
        fontFamily: fonts.med,
        fontSize: 17,
        marginBottom: 0.008 * height,
        textAlign: 'left',
    },
    input: {
        fontFamily: fonts.reg,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.main,
        paddingHorizontal: 0.03 * width,
        fontSize: 15,
        height: 0.06 * height,
        color: themeColors.text,
        textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    },
});

export default makeStyle;
