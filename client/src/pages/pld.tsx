import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import PLD from '@/modules/pld/pdf/PLD';
import { PDFViewer } from '@react-pdf/renderer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { connect, ConnectedProps } from 'react-redux';
import { getChangelogList } from '@/modules/pld/changelog/changelogReducer';
import { useEffect } from 'react';
import { getSprintList } from '@/modules/pld/sprint/sprintReducer';
import { getSprintPartReportList } from '@/modules/pld/sprint-part-report/sprintPartReportReducer';
import { getSprintPartList } from '@/modules/pld/sprint-part/sprintPartReducer';

const mapStateToProps = (state: RootState) => {
    return {
        changelog: state.changelog.list,
        sprints: state.sprint.list,
        sprlist: state.sprintPartReport.list,
        sprintPartList: state.sprintPart.list,
    };
}

const connector = connect(mapStateToProps, { getChangelogList, getSprintList, getSprintPartReportList, getSprintPartList });

function PLDPage(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();

    useEffect(() => {
        if (!props.changelog.loaded || !props.changelog.loading)
            (async () => dispatch(await props.getChangelogList()))();
        if (!props.sprints.loaded || !props.sprints.loading)
            (async () => dispatch(await props.getSprintList()))();
        if (!props.sprlist.loaded || !props.sprlist.loading)
            (async () => dispatch(await props.getSprintPartReportList()))();
        if (!props.sprintPartList.loaded || !props.sprintPartList.loading)
            (async () => dispatch(await props.getSprintPartList()))();
    }, []);

    if (!props.changelog.loaded || !props.sprints.loaded || !props.sprlist.loaded || !props.sprintPartList.loaded)
        return (
            <>
                <BasicHeader title="Test - Zephy Back Office" />
                <Page>
                </Page>
            </>
        );

    return (
        <>
            <BasicHeader title="PLD - Zephy Back Office" />
            <Page>
                <PDFViewer style={{width: '100%', height: '100%'}}>
                    <PLD
                        sprintPartList={props.sprintPartList.list!}
                        sprList={props.sprlist.list!}
                        changelog={props.changelog.list!}
                        sprints={props.sprints.list!} />
                </PDFViewer>
            </Page>
        </>
    );
}

export default connector(PLDPage);
