import Sprint from '@/entities/Sprint';
import globalStyles from '@/modules/pld/pdf/globalStyles';
import { Text, View } from '@react-pdf/renderer';

function ShowSprint(props: {
    sprint: Sprint
}) {
    return (
        <View>
            <Text style={globalStyles.h2}>{props.sprint.sprint_name}</Text>
            { props.sprint.data.deliverables.map(deliverable => {
                  return (
                      <Text style={globalStyles.h3}>
                          {deliverable.name}
                      </Text>
                  )
            }) }
        </View>
    );
}

export default function PLDSprints(props: {
    sprints: Sprint[],
}) {
    return (
        <View style={globalStyles.wrapper}>
            <Text style={globalStyles.title}>User stories et definition of done</Text>
            {
                props.sprints.map(sprint => <ShowSprint sprint={sprint} />)
            }
        </View>
    )
}
