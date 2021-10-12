import { Changelog } from '@/entities/Changelog';
import globalStyles, { purple, purpleLight } from '@/modules/pld/pdf/globalStyles';
import { getPLDDate } from '@/modules/pld/pdf/PLDutils';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    tableTitle: {
        color: 'white',
        backgroundColor: purple,
        fontFamily: 'QuicksandRegular',
        height: '100%',
        padding: 5,
        fontSize: 13,
        borderLeftColor: 'white',
        flex: 1,
    },
    tableElem: {
        color: purple,
        backgroundColor: purpleLight,
        fontFamily: 'QuicksandRegular',
        height: '100%',
        padding: 5,
        fontSize: 13,
        flex: 2,
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: 'white',
    },
    firstLeft: {
        borderTopLeftRadius: 10,
    },
    firstRight: {
        borderTopRightRadius: 10,
    },
    lastLeft: {
        borderBottomLeftRadius: 10,
    },
    lastRight: {
        borderBottomRightRadius: 10,
    },

    tableLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },

});

export default function PLDDescription(props: {
    changelog: Changelog[]
}) {
    let clone: Changelog[] = [];
    for (const log of props.changelog) {
        clone.push(log);
    }

    clone = clone.sort((a, b) => {
        return a.version < b.version ? 1 : -1;
    });

    let updateDate = '';
    let version = '';

    if (clone.length > 0) {
        version = clone[0].version;
        updateDate = getPLDDate(new Date(clone[0].date));
    }

    const titles = [
        'Titre',
        'Objet',
        'Auteur',
        'Responsable',
        'E-mail',
        'Mots-clés',
        'Promotion',
        'Date de mise à jour',
        'Version du modèle',
    ];

    const elements = [
        'PLD',
        'Project Log Document',
        "L'équipe ZEPHY",
        'Amaury Lecomte',
        'amaury.lecomte@epitech.eu',
        'User stories, fonctionnalités, tâches, gestion de projet, sprint, definition of done',
        '2023',
        updateDate,
        version,
    ];

    return (
        <View>
            <Text style={globalStyles.title}>
                Descriptif du document
            </Text>
            {titles.map((title, index) => {
                let titleClasses = [styles.tableTitle];
                let elemClasses = [styles.tableElem];
                const elem = elements[index];

                if (index === 0) {
                    titleClasses.push(styles.firstLeft);
                    elemClasses.push(styles.firstRight);
                }
                if (index === elements.length - 1) {
                    titleClasses.push(styles.lastLeft);
                    elemClasses.push(styles.lastRight);
                }

                return (
                    <View key={title} style={styles.tableLine}>
                        <Text style={titleClasses}>
                            {title}
                        </Text>
                        <Text style={elemClasses}>
                            {elem}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}
