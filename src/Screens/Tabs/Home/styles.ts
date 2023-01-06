/* eslint-disable prettier/prettier */
import { Platform, StyleSheet } from 'react-native';
import Constants from '../../../Config/Constants';

const { colors, width, height, fonts } = Constants;

const makeStyle = (themeColors: any) => {

    return StyleSheet.create({
        container: {
        },
        content: {
            minHeight: height,
        },
        upperSec: {
            backgroundColor: colors.bg,
            paddingBottom: 0.1 * height,
            paddingHorizontal: 0.05 * width,
            borderBottomLeftRadius: 0.1 * width,
            paddingTop: Platform.OS === 'ios' ? 0.04 * height : 0
        },
        header: {
            marginTop: 0.02 * height,
            // marginBottom: 0.01 * height
        },
        row: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        welcomeCont: {

        },
        textCont: {
            flexDirection: 'row',
        },
        welcomeText: {
            fontFamily: fonts.med,
            fontSize: 18,
            color: '#fff',

        },
        userName: {
            fontFamily: fonts.bold,
            fontSize: 22,
            color: '#fff',
        },
        iconCont: {
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 15,
            justifyContent: 'center',
            backgroundColor: colors.bg,
            width: 0.1 * width,

            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,

            elevation: 15,
            borderRadius: 10,
        }
        ,
        icon: {
            color: '#fff',
            textAlign: 'center',
        },
        iconLeft: {
            alignSelf: 'flex-start',
        },
        optionsListCont: {
            marginTop: -0.07 * height,
        },
        optionsList: {
            paddingStart: 0.05 * width,
        },
        section: {
            marginVertical: 0.02 * height
        },
        secTitle: {
            color: themeColors.text,
            fontFamily: fonts.med,
            fontSize: 18,
            marginStart: 0.03 * width,
            marginBottom: 0.01 * height,
        },
        listCont: {},
        list: {}
    });
}
export default makeStyle;
