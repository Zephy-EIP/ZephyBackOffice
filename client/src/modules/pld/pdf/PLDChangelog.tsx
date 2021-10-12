import { Changelog } from '@/entities/Changelog';
import globalStyles, { purple, purpleLight } from '@/modules/pld/pdf/globalStyles';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    tableTitle: {
        color: 'white',
        backgroundColor: purple,
        fontFamily: 'QuicksandRegular',
        height: '100%',
        padding: 5,
        fontSize: 13,
        borderRightStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: 'white',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        textAlign: 'center',
    },
    date: {
        flex: 2,
    },
    version: {
        flex: 1.5,
    },
    author: {
        flex: 3,
    },
    sections: {
        flex: 2,
    },
    comments: {
        flex: 3,
    },
    tableElem: {
        color: purple,
        backgroundColor: purpleLight,
        fontFamily: 'QuicksandRegular',
        height: '100%',
        padding: 5,
        fontSize: 11,
        borderRightStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: 'white',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
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

    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },

    tableLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },

});

export default function PLDChangelog(props: {
    changelog: Changelog[],
}) {
    let clone: Changelog[] = [];
    for (const log of props.changelog) {
        clone.push(log);
    }

    clone = clone.sort((a, b) => {
        return a.version > b.version ? 1 : -1;
    });

    return (
        <View style={globalStyles.wrapper}>
            <Text style={globalStyles.title}>
                Tableau des révisions
            </Text>
            <View style={styles.table}>
                <View style={styles.tableLine}>
                    <Text style={[styles.tableTitle, styles.firstLeft, styles.date]}>Date</Text>
                    <Text style={[styles.tableTitle, styles.version]}>Version</Text>
                    <Text style={[styles.tableTitle, styles.author]}>Auteur</Text>
                    <Text style={[styles.tableTitle, styles.sections]}>Section(s)</Text>
                    <Text style={[styles.tableTitle, styles.firstRight, styles.comments]}>Commentaires</Text>
                </View>
                {
                    clone.map((log, index) => {
                        const classesFirst = [styles.tableElem, styles.date];
                        const classesLast = [styles.tableElem, styles.comments];
                        if (index === clone.length - 1) {
                            classesLast.push(styles.lastRight);
                            classesFirst.push(styles.lastLeft);
                        }
                        const date = new Date(log.date);
                        return (
                            <View key={log.id} style={styles.tableLine}>
                                <Text style={classesFirst}>
                                    {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
                                </Text>
                                <Text style={[styles.tableElem, styles.version]}>
                                    {log.version}
                                </Text>
                                <Text style={[styles.tableElem, styles.author]}>
                                    {log.author}
                                </Text>
                                <Text style={[styles.tableElem, styles.sections]}>
                                    {log.sections}
                                </Text>
                                <Text style={classesLast}>
                                    {log.comments}
                                </Text>
                            </View>
                        );
                    })
                }
            </View>
        </View>
    )
}
