/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import Constants from '../../../Config/Constants';

const { colors, width, height, fonts } = Constants;

const makeStyle = (themeColors: any) => StyleSheet.create({
    container: {
    },
    content: {
        minHeight: height
    },
    upperSec: {
        backgroundColor: colors.bg,
        paddingBottom: 0.1 * height,
        paddingHorizontal: 0.05 * width,
        borderBottomLeftRadius: 0.1 * width,
    },
    header: {
        marginTop: 0.02 * height,
        // marginBottom: 0.01 * height
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    welcomeCont: {},
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
    icon: {
        color: '#fff',
        display: 'flex',
        alignSelf: 'flex-end',
        backgroundColor: colors.bg,
        width: 0.1 * width,
        height: 0.06 * height,
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,

        elevation: 15,
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

export default makeStyle;
