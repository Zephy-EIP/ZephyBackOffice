import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
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
    const [sprintName, setSprintNameState] = useState('');
    const [ref, setRef] = useState(null as HTMLFormElement | null);
    const [msg, setMsg] = useState(undefined as React.ReactNode | undefined);

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    useEffect(() => {
        if (props.create.loaded) {
            dispatch(props.resetCreateSprint());
            reset();
            if (props.create.success) {
                setMsg(
                    <div className="success">
                        Created sprint successfully.
                    </div>
                );
                (async () => dispatch(await props.getSprintListNames()))();
            } else {
                setMsg(
                    <div className="error">
                        Error: {props.create.error ?? "Couldn't create sprint"}
                    </div>
                )
            }
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
        setSprintNameState('');
        ref?.reset();
    }

    function setSprintName(name: string) {
        setSprintNameState(name);
        setMsg(undefined);
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
            {msg}
            <Button disabled={sprintName === '' || file === null } onClick={onClick}>
                Create from CSV
            </Button>
        </form>
    );
}

export default connector(SprintUpdateData);
