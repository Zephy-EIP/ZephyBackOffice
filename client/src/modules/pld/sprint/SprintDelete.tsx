import Button from '@/components/buttons/Button';
import Select, { SelectElement } from '@/components/selectors/Select';
import { deleteSprint, getSprintListNames, resetDeleteSprint } from '@/modules/pld/sprint/sprintReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        delSprint: state.sprint.deleteSprint,
        sprintNames: state.sprint.listNames,
    };
}

const connector = connect(mapStateToProps, { getSprintListNames, deleteSprint, resetDeleteSprint });

function SprintDelete(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [sprintName, setSprintName] = useState('');

    const elements: SelectElement[] = [new SelectElement('Choose sprint...', '')].concat(
        props.sprintNames.list?.map(value => new SelectElement(value, value)) || []
    );

    useEffect(() => {
        if (!props.delSprint.loaded)
            return;
        dispatch(props.resetDeleteSprint());
        reset();
        if (props.delSprint.success)
            (async () => dispatch(await props.getSprintListNames()))();
    }, [props.delSprint.loaded]);

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    function reset() {
        setSprintName('');
    }

    async function deletefct() {
        if (sprintName === '')
            return;
        dispatch(await props.deleteSprint({sprintName}));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Delete Sprint</h2>
            <div className="quicksand-medium">
                Choose sprint
            </div>
            <div className="input">
                <Select elements={elements} elemKey={sprintName} onChange={setSprintName} />
            </div>
            <Button onClick={deletefct}>
                Delete Sprint
            </Button>
        </form>
    );
}

export default connector(SprintDelete);

