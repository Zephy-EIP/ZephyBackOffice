import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import Select, { SelectElement } from '@/components/selectors/Select';
import { getSprintListNames, resetCreateSprint, createSprint } from '@/modules/pld/sprint/sprintReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        sprintNames: state.sprint.listNames,
        create: state.sprint.createSprint,
    };
}

const connector = connect(mapStateToProps, { getSprintListNames, resetCreateSprint, createSprint });

function SprintUpdateData(props: ConnectedProps<typeof connector>) {
    const [file, setFile] = useState(null as File | null);
    const dispatch = useThunkDispatch();
    const [sprintName, setSprintName] = useState('');
    const [ref, setRef] = useState(null as HTMLFormElement | null);

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    useEffect(() => {
        if (props.create.loaded) {
            // TODO: better communication with the user
            dispatch(props.resetCreateSprint());
            reset();
            if (props.create.success)
                (async () => dispatch(await props.getSprintListNames()))();
        }
    }, [props.create.loaded]);

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null || e.target.files.length === 0) {
            setFile(null);
            return;
        }
        setFile(e.target.files[0]);
    }

    const reset = () => {
        setFile(null);
        setSprintName('');
        ref?.reset();
    }

    const onClick = async () => {
        if (sprintName === '' || file === null)
            return;

        dispatch(await props.createSprint({sprintName, dataFile: file}));
    }

    return (
        <form ref={setRef} onSubmit={e => e.preventDefault()}>
            <h2>Create Sprint</h2>
            <div className="quicksand-medium">
                Sprint name
            </div>
            <TextInput
                placeholder="Test & Learn"
                className="input"
                onChange={setSprintName}
                value={sprintName} />
            <input type="file" name="sprintFile" onChange={onChangeFile} />
            <br /><br />
            <Button onClick={onClick}>
                Create from CSV
            </Button>
        </form>
    );
}

export default connector(SprintUpdateData);
