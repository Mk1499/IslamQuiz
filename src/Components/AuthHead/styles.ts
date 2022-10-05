/* eslint-disable prettier/prettier */
import { Platform, StyleSheet } from 'react-native';
import Constants from '../../Config/Constants';

export default StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 0.05 * Constants.height : 0,
        backgroundColor: Constants.colors.bg,
        width: Constants.width,
        paddingHorizontal: 0.03 * Constants.width,
        paddingBottom: 0.04 * Constants.height,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    brand: {
        marginVertical: 0.01 * Constants.height,
        fontSize: 40,
        color: Constants.colors.white,
        fontWeight: 'bold',
    },
    dataCont: {
        marginVertical: 0.01 * Constants.height,
    },
    title: {
        color: Constants.colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 0.01 * Constants.height,
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 15,
        marginEnd: 5,
        color: Constants.colors.white,
    },
    link: {
        color: Constants.colors.sky,
    },
    firstExtend: {
        height: 30,
        backgroundColor: Constants.colors.bg,
        width: '95%',
        alignSelf: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginTop: -10,
        zIndex: -1,
        opacity: 0.9,
    },
    secExtent: {
        height: 30,
        backgroundColor: Constants.colors.bg,
        width: '85%',
        alignSelf: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginTop: -1,
        zIndex: -3,
        opacity: 0.8,
    },
});
