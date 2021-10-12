import globalStyles from '@/modules/pld/pdf/globalStyles';
import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    image: {
        margin: '50px 0',
    },
})

export default function PLDDeliverables() {
    return (
        <View>
            <Text style={globalStyles.title}>Organigramme des livrables</Text>
            <Image src="/images/livrables.jpeg" style={styles.image} />
            <Text style={globalStyles.title}>Description des livrables</Text>
            <Image src="/images/livrable1.jpeg" style={styles.image} />
            <Image src="/images/livrable2.jpeg" style={styles.image} />
            <Image src="/images/livrable3.jpeg" style={styles.image} />
            <Image src="/images/livrable4.jpeg" style={styles.image} />
        </View>
    )
}
