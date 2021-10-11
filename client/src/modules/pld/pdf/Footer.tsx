import globalStyles from '@/modules/pld/pdf/globalStyles';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import PagesManifestPlugin from 'next/dist/build/webpack/plugins/pages-manifest-plugin';

const styles = StyleSheet.create({
    pageNumber: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 20,
        textAlign: 'right',
        fontSize: 11,
        color: '#333',
    },
    footerDescription: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 0,
        textAlign: 'left',
        fontSize: 11,
        color: '#333',
    },
    bar: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        height: 1,
        backgroundColor: '#333',
    },

});

export default function() {
    function render(args: {pageNumber: number, totalPages: number}) {
        return (`Page ${args.pageNumber} sur ${args.totalPages}`);
    }

    return (
        <>
            <View style={styles.bar} fixed/>
            <Text style={[styles.pageNumber, globalStyles.regular]} render={render} fixed />
            <Text style={[styles.footerDescription, globalStyles.regular]} render={() => 'Zephy - Epitech Innovative Project'} fixed>
            </Text>
        </>
    )
}
