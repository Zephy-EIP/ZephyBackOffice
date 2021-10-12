import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import Select, { SelectElement } from '@/components/selectors/Select';
import { getMemberList } from '@/modules/pld/member/memberReducer';
import { createSprintPartReport, deleteSprintPartReport, getSprintPartReportList, resetSprintPartReportCreate, resetSprintPartReportDelete, resetSprintPartReportUpdate, updateSprintPartReport } from '@/modules/pld/sprint-part-report/sprintPartReportReducer';
import { getSprintPartList } from '@/modules/pld/sprint-part/sprintPartReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from './SprintPartForm.module.scss';

const mapStateToProps = (state: RootState) => {
    return {
        create: state.sprintPartReport.create,
        delete: state.sprintPartReport.delete,
        update: state.sprintPartReport.update,
        spList: state.sprintPart.list,
        memberList: state.member.list,
        sprList: state.sprintPartReport.list,
    };
}

const connector = connect(mapStateToProps, {
    getMemberList,
    createSprintPartReport,
    updateSprintPartReport,
    deleteSprintPartReport,
    getSprintPartList,
    resetSprintPartReportCreate,
    resetSprintPartReportDelete,
    resetSprintPartReportUpdate,
    getSprintPartReportList,
});

function SprintPartReportForm(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [sprintPartId, setSprintPartId] = useState('');
    const [member, setMember] = useState('');
    const [report, setReport] = useState('');
    const [reportExists, setReportExists] = useState(false);
    let mainButtonTitle = 'Create Report';

    if (reportExists)
        mainButtonTitle = 'Update Report';

    const sprintParts: SelectElement[] = [new SelectElement('Choose sprint part...', '')].concat(
        props.spList.list?.map(value => new SelectElement(`${value.sprint_name} | ${value.type}`, value.id.toString())) || []
    );

    const members: SelectElement[] = [new SelectElement('Choose member...', '')].concat(
        props.memberList.list?.map(value => new SelectElement(value.member_name, value.member_name)) || []
    );

    useEffect(() => {
        if (sprintPartId !== '' && member !== '') {
            const spr = props.sprList.list?.find(spr => spr.member_name === member && spr.sprint_part_id.toString() === sprintPartId)
            if (spr === undefined) {
                setReportExists(false);
                return;
            }
            setReportExists(true);
            setReport(spr.report);
        } else {
            setReportExists(false);
        }
    }, [member, sprintPartId]);

    useEffect(() => {
        if (!props.create.loaded)
            return;
        if (props.create.success)
            (async () => dispatch(await props.getSprintPartReportList()))();
        reset();
        dispatch(props.resetSprintPartReportCreate());
    }, [props.create.loaded]);

    useEffect(() => {
        if (!props.delete.loaded)
            return;
        if (props.delete.success)
            (async () => dispatch(await props.getSprintPartReportList()))();
        reset();
        dispatch(props.resetSprintPartReportDelete());
    }, [props.delete.loaded]);

    useEffect(() => {
        if (!props.update.loaded)
            return;
        if (props.update.success)
            (async () => dispatch(await props.getSprintPartReportList()))();
        reset();
        dispatch(props.resetSprintPartReportUpdate());
    }, [props.update.loaded]);

    useEffect(() => {
        if (!props.spList.loaded && !props.spList.loading)
            (async () => dispatch(await props.getSprintPartList()))();
        if (!props.sprList.loaded && !props.sprList.loading)
            (async () => dispatch(await props.getSprintPartReportList()))();
        if (!props.memberList.loaded && !props.memberList.loading)
            (async () => dispatch(await props.getMemberList()))();
    }, []);

    function reset() {
        setMember('');
        setReport('');
        setSprintPartId('');
    }

    async function createFct() {
        dispatch(await props.createSprintPartReport({sprintPartId: parseInt(sprintPartId), memberName: member, report}));
    }

    async function updateFct() {
        dispatch(await props.updateSprintPartReport({sprintPartId: parseInt(sprintPartId), memberName: member, report}));
    }

    async function deleteFct() {
        dispatch(await props.deleteSprintPartReport({sprintPartId: parseInt(sprintPartId), memberName: member}));
    }

    function mainButtonFct() {
        if (reportExists)
            updateFct();
        else
            createFct();
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Sprint Reports</h2>
            <div className="quicksand-medium">
                Choose sprint part
            </div>
            <div className="input">
                <Select
                    elemKey={sprintPartId}
                    onChange={setSprintPartId}
                    elements={sprintParts}
                />
            </div>
            <div className="quicksand-medium">
                Choose project member
            </div>
            <div className="input">
                <Select
                    elemKey={member}
                    onChange={setMember}
                    elements={members}
                />
            </div>
            <div className="quicksand-medium">
                Report
            </div>
            <TextInput
                className="input"
                value={report}
                onChange={setReport}
                placeholder="Durant ce mois, ..." />
            <Button
                onClick={mainButtonFct}
                disabled={sprintPartId === '' || member  === ''}>
                {mainButtonTitle}
            </Button>
            <Button
                onClick={deleteFct}
                className={styles.btnOrange}
                disabled={!reportExists}>
                Delete
            </Button>
        </form>
    );
}

export default connector(SprintPartReportForm);
