import Button from '@/components/buttons/Button';
import Select, { SelectElement } from '@/components/selectors/Select';
import { getSprintListNames, resetSprintUpdateData, updateSprintData } from '@/modules/pld/sprint/sprintReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { ChangeEvent, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        sprintNames: state.sprint.listNames,
        sprintUpdate: state.sprint.updateData,
    };
}

const connector = connect(mapStateToProps, { getSprintListNames, resetSprintUpdateData, updateSprintData });

function SprintUpdateData(props: ConnectedProps<typeof connector> & {
    sprintName: string,
    onReset: () => void,
}) {
    const [file, setFile] = useState(null as File | null);
    const dispatch = useThunkDispatch();
    const [ref, setRef] = useState(null as HTMLFormElement | null);
    const [msg, setMsg] = useState(undefined as React.ReactNode | undefined);

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    useEffect(() => {
        if (props.sprintUpdate.loaded) {
            // TODO: better communication with the user
            dispatch(props.resetSprintUpdateData());
            reset();
            if (props.sprintUpdate.success) {
                setMsg(
                    <div className="success">
                        Updated sprint successfully.
                    </div>
                );
                (async () => dispatch(await props.getSprintListNames()))();
            } else {
                setMsg(
                    <div className="error">
                        Error: {props.sprintUpdate.error ?? "Couldn't udpate sprint"}
                    </div>
                )
            }
        }
    }, [props.sprintUpdate.loaded]);

    useEffect(() => {
        if (props.sprintName !== '')
            setMsg(undefined);
    }, [props.sprintName]);

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null || e.target.files.length === 0) {
            setFile(null);
            return;
        }
        setFile(e.target.files[0]);
    }

    const reset = () => {
        setFile(null);
        ref?.reset();
        props.onReset();
    }

    const onClick = async () => {
        if (props.sprintName === '' || file === null)
            return;

        dispatch(await props.updateSprintData({sprintName: props.sprintName, dataFile: file}));
    }

    return (
        <form ref={setRef} onSubmit={e => e.preventDefault()}>
            <input type="file" name="sprintFile" onChange={onChangeFile} />
            <br /><br />
            {msg}
            <Button onClick={onClick} disabled={ props.sprintName === '' || file === null }>
                Update CSV
            </Button>
        </form>
    );
}

export default connector(SprintUpdateData);
