import Sprint, { MemberLoad, UserStory } from '@/entities/Sprint';
import globalStyles, { purple, purpleLight } from '@/modules/pld/pdf/globalStyles';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    userStory: {
        marginTop: 10,
        marginBottom: 20,
    },

    head: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: purple,
        color: 'white',
        fontFamily: 'QuicksandMedium',
        fontSize: 14,
        borderBottomColor: 'white',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        padding: 5,
    },
    secondLine: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
    },
    role: {
        fontFamily: 'QuicksandRegular',
        borderRightColor: 'white',
        borderRightStyle: 'solid',
        borderRightWidth: 1,
        backgroundColor: purpleLight,
        color: purple,
        fontSize: 14,
        flex: 2,
        padding: 5,
        height: '100%',
    },
    goal: {
        fontFamily: 'QuicksandRegular',
        backgroundColor: purpleLight,
        color: purple,
        fontSize: 14,
        flex: 5,
        padding: 5,
        height: '100%',
    },
    oneLineElem: {
        fontFamily: 'QuicksandRegular',
        backgroundColor: purpleLight,
        color: purple,
        fontSize: 14,
        borderBottomColor: 'white',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        padding: 5,
        textAlign: 'justify',
    },

    lastElem: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: 'flex',
        flexDirection: 'row',
    },

    charge: {
        textAlign: 'right',
        flex: 1,
    },

    bold: {
        fontFamily: 'QuicksandBold',
    },

    memberInList: {
        marginTop: 20,
        fontSize: 14,
    },

    taskInList: {
        fontFamily: 'QuicksandRegular',
        fontSize: 12,
        lineHeight: 1.2,
    },
    taskCompleted: {
        color: '#4BB543',
    },

    memberLoads: {
        marginBottom: 50,
    }
});

function ShowUS(props: {
    userStory: UserStory
}) {
    return (
        <View style={styles.userStory} wrap={false}>
            <Text style={styles.head} wrap={false}>{props.userStory.title}</Text>
            <View style={styles.secondLine} wrap={false}>
                <Text style={styles.role} wrap={false}>
                    <Text style={styles.bold} wrap={false}>{'En tant que :\n'}</Text>{props.userStory.role}
                </Text>
                <Text style={styles.goal} wrap={false}>
                    <Text style={styles.bold} wrap={false}>{'Je veux :\n'}</Text>{props.userStory.goal}
                </Text>
            </View>
            <Text style={styles.oneLineElem} wrap={false}>
                <Text style={styles.bold} wrap={false}>{'Description :\n'}</Text>{props.userStory.description}
            </Text>
            <Text style={styles.oneLineElem} wrap={false}>
                <Text style={styles.bold} wrap={false}>{'Definition of done :\n'}</Text>{
                    props.userStory.dod.map(str => `${str}\n`)
                }
            </Text>
            <View style={[styles.oneLineElem, styles.lastElem]} wrap={false}>
                <Text style={styles.bold} wrap={false}>{'Charge Estimée : '}</Text>
                <Text style={styles.charge}>{props.userStory.load} J/H</Text>
            </View>
        </View>
    )
}

type MemberTaskLoad = MemberLoad & {
    task: string,
}

function SprintTasks(props: {
    tasks: MemberTaskLoad[],
}) {
    let lastMember = '';

    return (
        <View style={styles.memberLoads}>
            {
                props.tasks.map(task => {
                    let memberName = <></>;
                    if (lastMember !== task.memberName) {
                        lastMember = task.memberName;
                        memberName = (
                            <View style={styles.memberInList}>
                                <Text style={styles.bold}>
                                    • {lastMember} :
                                </Text>
                            </View>
                        )
                    }

                    const classes = [styles.taskInList];
                    if (task.status === 'done')
                        classes.push(styles.taskCompleted);
                    else if (task.status === 'in progress')
                        classes.push(globalStyles.orange);

                    return (
                        <View key={task.memberName + task.task}>
                            {memberName}
                            <Text style={classes}>∙ {task.task} ({task.load}j)</Text>
                        </View>
                    )


                })
            }
        </View>
    )
}

function ShowSprint(props: {
    sprint: Sprint
}) {
    let memberLoads: MemberTaskLoad[] = [];

    props.sprint.data.deliverables.forEach(d => {
        d.userStories.forEach(us =>{
            memberLoads = memberLoads.concat(us.memberLoads.map(ml => {
                return {...ml, task: us.title};
            }));
        })
    });

    memberLoads.sort((a, b) => {
        if (a.memberName > b.memberName) {
            return 1;
        } else if (a.memberName === b.memberName) {
            return a.task > b.task ? 1 : -1;
        }
        return -1;
    });

    return (
        <View>
            <Text style={globalStyles.h2}>{props.sprint.sprint_name}</Text>
            { props.sprint.data.deliverables.map(deliverable => {
                  return (
                      <View key={deliverable.name}>
                          <Text style={globalStyles.h3}>
                              {deliverable.name}
                          </Text>
                          {
                              deliverable.userStories.map(userStory => <ShowUS key={userStory.title} userStory={userStory} />)
                          }
                      </View>
                  )
            }) }
            <SprintTasks tasks={memberLoads} />
        </View>
    );
}

export default function PLDSprints(props: {
    sprints: Sprint[],
}) {
    return (
        <View break>
            <Text style={[globalStyles.title]}>User stories et definition of done</Text>
            {
                props.sprints.map(sprint => <ShowSprint key={sprint.sprint_name} sprint={sprint} />)
            }
        </View>
    )
}
