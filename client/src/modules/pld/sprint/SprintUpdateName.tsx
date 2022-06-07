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

function SprintUpdateName(props: ConnectedProps<typeof connector> & {
    sprintName: string,
    onReset: () => void,
}) {
    const dispatch = useThunkDispatch();
    const [newSprintName, setNewSprintNameState] = useState('');
    const [msg, setMsg] = useState(null as React.ReactNode | null);

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
        if (props.updateName.success) {
            (async () => dispatch(await props.getSprintListNames()))();
            setMsg(
                <div className="success">
                    Updated sprint successfully.
                </div>
            );
        } else {
            setMsg(
                <div className="error">
                    Couldn't update sprint.
                </div>
            );
        }
    }, [props.updateName.loaded]);

    useEffect(() => {
        if (props.sprintName !== '')
            setMsg(null);
    }, [props.sprintName]);

    const reset = () => {
        setNewSprintNameState('');
        props.onReset();
    }

    function setNewSprintName(name: string) {
        setNewSprintNameState(name);
        setMsg(null);
    }

    const updateName = async () => {
        if (props.sprintName === '' || newSprintName.length < 5)
            return;
        dispatch(await props.updateSprintName({ sprintName: props.sprintName, newName: newSprintName }));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <div className="quicksand-medium">New sprint name</div>
            <TextInput className="input" placeholder="Test & Learn" onChange={setNewSprintName} value={newSprintName} />
            {msg}
            <Button onClick={updateName} disabled={props.sprintName === '' || newSprintName.length < 5}>
                Update Name
            </Button>
        </form>
    );
}

export default connector(SprintUpdateName);
