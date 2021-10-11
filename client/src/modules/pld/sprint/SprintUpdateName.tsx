import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import Select, { SelectElement } from '@/components/selectors/Select';
import { getSprintListNames, resetSprintUpdateName, updateSprintName } from '@/modules/pld/sprint/sprintReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        sprintNames: state.sprint.listNames,
        updateName: state.sprint.updateName,
    };
}



const connector = connect(mapStateToProps, { resetSprintUpdateName, getSprintListNames, updateSprintName });

function SprintUpdateName(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [sprintName, setSprintName] = useState('');
    const [newSprintName, setNewSprintName] = useState('');

    const elements: SelectElement[] = [new SelectElement('Choose sprint...', '')].concat(
        props.sprintNames.list?.map(value => new SelectElement(value, value)) || []
    );

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    useEffect(() => {
        if (!props.updateName.loaded)
            return;
        dispatch(props.resetSprintUpdateName());
        reset();
        if (props.updateName.success)
            (async () => dispatch(await props.getSprintListNames()))();
    }, [props.updateName.loaded]);

    const reset = () => {
        setSprintName('');
        setNewSprintName('');
    }

    const updateName = async () => {
        if (sprintName === '' || newSprintName.length < 5)
            return;
        dispatch(await props.updateSprintName({sprintName, newName: newSprintName}));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Update Sprint Name</h2>
            <div className="quicksand-medium">Choose sprint</div>
            <div className="input">
                <Select elements={elements} elemKey={sprintName} onChange={setSprintName} />
            </div>
            <div className="quicksand-medium">New sprint name</div>
            <TextInput className="input" placeholder="Test & Learn" onChange={setNewSprintName} value={newSprintName} />
            <Button onClick={updateName}>
                Update Name
            </Button>
        </form>
    );
}

export default connector(SprintUpdateName);
