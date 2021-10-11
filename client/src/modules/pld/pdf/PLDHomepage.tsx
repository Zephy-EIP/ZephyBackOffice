import { Text, StyleSheet, View, Image } from '@react-pdf/renderer';
import gs from '@/modules/pld/pdf/globalStyles';
import { getPLDDate } from '@/modules/pld/pdf/PLDutils';

const styles = StyleSheet.create({
    title: {
        padding: '10% 10% 0 10%',
        fontSize: '30pt',
    },
    date: {
        padding: '5% 10%',
        fontSize: '11pt',
    },
    imageWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 50,
        padding: '10%',
    },
    logoWrapper: {
        width: '33%',
    },
    logo: {
        height: 50,
        margin: 'auto',
    },
})

export default function PLDHomepage() {
    return (
        <View>
            <Text style={[gs.bold, styles.title]}>
                PLD
            </Text>
            <Text style={[gs.orange, styles.date, gs.medium]}>
                {getPLDDate()}
            </Text>
            <Image src="/images/HomepageBackground.png" />
            <View style={styles.imageWrapper}>
                <View style={styles.logoWrapper}>
                    <Image style={styles.logo} src="/images/Epitech.png" />
                </View>
                <View style={styles.logoWrapper}>
                    <Image style={styles.logo} src="/images/logo.png" />
                </View>
                <View style={styles.logoWrapper}>
                    <Image style={styles.logo} src="/images/eip.png" />
                </View>
            </View>
        </View>
    );
}
