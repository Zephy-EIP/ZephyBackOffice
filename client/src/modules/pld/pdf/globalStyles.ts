import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: 'QuicksandRegular',
    src: '/fonts/Quicksand-Regular.ttf',
    fontStyle: 'normal',
    fontWeight: 'normal'
});

Font.register({
    family: 'QuicksandMedium',
    src: '/fonts/Quicksand-Medium.ttf',
    fontStyle: 'normal',
    fontWeight: 'normal'
});

Font.register({
    family: 'QuicksandBold',
    src: '/fonts/Quicksand-Bold.ttf',
    fontStyle: 'normal',
    fontWeight: 'normal'
});

const globalStyles = StyleSheet.create({
    medium: {
        fontFamily: 'QuicksandMedium',
    },
    regular: {
        fontFamily: 'QuicksandRegular',
    },
    bold: {
        fontFamily: 'QuicksandBold',
    },
    purple: {
        color: '#B4A7D6',
    },
    orange: {
        color: '#F7B26A',
    },
    title: {
        fontFamily: 'QuicksandBold',
        fontSize: '24pt',
        marginBottom: 15,
    }
})

export default globalStyles;
