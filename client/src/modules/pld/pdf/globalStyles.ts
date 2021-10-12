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

export const purpleLight = '#EDE6FF';
export const purple = '#B4A7D6';
export const orange = '#F7B26A';

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
    purpleLight: {
        color: '#EDE6FF',
    },
    orange: {
        color: '#F7B26A',
    },
    title: {
        fontFamily: 'QuicksandBold',
        fontSize: '24pt',
        marginBottom: 15,
    },
    h2: {
        fontFamily: 'QuicksandMedium',
        fontSize: '20pt',
        marginBottom: 15,
    },
    h3: {
        fontFamily: 'QuicksandMedium',
        fontSize: '16pt',
        marginBottom: 15,
    },
    wrapper: {
        padding: '5% 10%',
    }
})

export default globalStyles;
