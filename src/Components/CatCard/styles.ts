/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import Constants from "../../Config/Constants";

const { width, height, colors, fonts } = Constants;

const makeStyle = () => StyleSheet.create({
    container: {
        width: 0.4 * width,
        marginHorizontal: 0.02 * width,
        backgroundColor: '#fff',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,

        marginVertical: 10

    },
    cover: {
        width: '100%',
        height: 0.2 * height,
        borderTopRightRadius: 20,
    },
    name: {
        color: colors.main,
        fontFamily: fonts.bold,
        fontSize: 15,
        paddingStart: 10,
        textAlign: 'center',
        marginVertical: 0.01 * height
    }
});

export default makeStyle;