import Sprint from '@/entities/Sprint';
import SprintPart from '@/entities/SprintPart';
import { SprintPartReport } from '@/entities/SprintPartReport';
import globalStyles from '@/modules/pld/pdf/globalStyles';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    title: {
        textDecoration: 'underline',
        fontFamily: 'QuicksandMedium',
        fontSize: 14,
        marginBottom: 15,
    },
    name: {
        fontSize: 12,
        fontFamily: 'QuicksandMedium',
    },
    text: {
        fontSize: 12,
        fontFamily: 'QuicksandRegular',
        marginBottom: 15,
        textAlign: 'justify',
    },
});

function PartReports(props: {
    sprList: SprintPartReport[],
    sprintPart: SprintPart,
}) {
    const sprl = props.sprList.filter(spr => {
        return props.sprintPart.id === spr.sprint_part_id;
    });

    return (
        <View>
            <Text style={styles.title}>{props.sprintPart.title}</Text>
            <Text style={styles.text}>{props.sprintPart.description}</Text>
            {
                sprl.map(spr =>
                    <View key={spr.member_name + spr.sprint_part_id.toString()}>
                        <Text style={styles.name}>{spr.member_name}</Text>
                        <Text style={styles.text}>{spr.report}</Text>
                    </View>
                )
            }
        </View>
    );
}

function SprintReports(props: {
    sprList: SprintPartReport[],
    sprintPartList: SprintPart[],
}) {
    const spl = props.sprintPartList.slice();
    spl.sort((a, b) => {
        if (a.type === 'D')
            return 1;
        else if (b.type === 'KO')
            return 1;
        else if (a.type === 'FU2' && b.type == 'FU')
            return 1;
        return -1;
    });

    return (
        <View>
            {
                spl.map(sp =>
                    <PartReports key={sp.id} sprList={props.sprList} sprintPart={sp} />
                )
            }
        </View>
    )
}

export default function PLDReports(props: {
    sprints: Sprint[],
    sprList: SprintPartReport[],
    sprintPartList: SprintPart[],
}) {
    return (
        <View>
            <Text style={globalStyles.title}>
                Rapports d'avancement
            </Text>
            {
                props.sprints.map(sprint => {
                    const splist = props.sprintPartList.filter(sp => sp.sprint_name === sprint.sprint_name);
                    return (
                        <SprintReports
                            sprintPartList={splist}
                            sprList={props.sprList}
                            key={sprint.sprint_name} />
                    )
                })
            }
        </View>
    )
}
