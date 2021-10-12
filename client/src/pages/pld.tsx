import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import PLD from '@/modules/pld/pdf/PLD';
import { PDFViewer } from '@react-pdf/renderer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { connect, ConnectedProps } from 'react-redux';
import { getChangelogList } from '@/modules/pld/changelog/changelogReducer';
import { useEffect } from 'react';
import { getSprintList } from '@/modules/pld/sprint/sprintReducer';

const mapStateToProps = (state: RootState) => {
    return {
        changelog: state.changelog.list,
        sprints: state.sprint.list,
    };
}

const connector = connect(mapStateToProps, { getChangelogList, getSprintList });

function PLDPage(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();

    useEffect(() => {
        if (!props.changelog.loaded || !props.changelog.loading)
            (async () => dispatch(await props.getChangelogList()))();
        if (!props.sprints.loaded || !props.sprints.loading)
            (async () => dispatch(await props.getSprintList()))();
    }, []);

    if (!props.changelog.loaded || !props.sprints.loaded)
        return (
            <>
                <BasicHeader title="Test - Zephy Back Office" />
                <Page>
                </Page>
            </>
        );

    return (
        <>
            <BasicHeader title="Test - Zephy Back Office" />
            <Page>
                <PDFViewer style={{width: '100%', height: '100%'}}>
                    <PLD
                        changelog={props.changelog.list!}
                        sprints={props.sprints.list!} />
                </PDFViewer>
            </Page>
        </>
    );
}

export default connector(PLDPage);
