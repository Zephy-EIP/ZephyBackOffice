import { Text, StyleSheet, View, Image } from '@react-pdf/renderer';
import gs from '@/modules/pld/pdf/globalStyles';
import { getPLDDate } from '@/modules/pld/pdf/PLDutils';

const styles = StyleSheet.create({
    wrapper: {
        padding: '5% 10%',
    },
    text: {
        fontSize: 14,
        lineHeight: 1.6,
    },
    invisible: {
        opacity: 0,
    },
})

export default function PLDSummary() {
    return (
        <View style={styles.wrapper}>
            <Text style={gs.title}>
                Résumé
            </Text>
            <Text style={[gs.regular, styles.text]}>
                <Text style={styles.invisible}>____</Text>
                {`Le PLD (Project Log Document) est un document qui accompagne l’équipe ZEPHY tout au long du développement du projet EIP, et qui s'étoffe au fur et à mesure de l’avancement de celui-ci. Il sert de support lors des rendez-vous mensuels avec le référent EIP :\n\n`}
                <Text style={styles.invisible}>__</Text>
                {`• Lors d’un Kick Off, il servira à définir le scope du sprint à venir ;\n`}
                <Text style={styles.invisible}>__</Text>
                {`• Lors d’un Follow Up, il pourra être utilisé pour y apporter des modifications en cours de sprint ;\n`}
                <Text style={styles.invisible}>__</Text>
                {`• Lors d’un Delivery, il servira de support à la validation du sprint passé.\n\n`}
                {`Plus généralement et sur le long terme, le PLD permet de conserver une trace de l’évolution et de l’avancement du projet au cours du temps.\n\n`}
                {`Ce document a aussi pour objectif d’apprendre :\n\n`}
                <Text style={styles.invisible}>__</Text>
                {`• À découper un projet en stories (technique ou utilisateur) et à les détailler ;\n`}
                <Text style={styles.invisible}>__</Text>
                {`• À définir les critères d’acceptation d’une story ;\n`}
                <Text style={styles.invisible}>__</Text>
                {`• À synthétiser votre avancement en présentant les éléments clés.\n\n`}
                En outre, lorsqu’il est bien préparé en amont, ce document est une très bonne base pour tenir une réunion de projet, puisque tous les éléments principaux y sont abordés.
            </Text>

        </View>
    )
}
