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

function SprintUpdateData(props: ConnectedProps<typeof connector>) {
    const [file, setFile] = useState(null as File | null);
    const dispatch = useThunkDispatch();
    const elements: SelectElement[] = [new SelectElement('Choose sprint...', '')].concat(
        props.sprintNames.list?.map(value => new SelectElement(value, value)) || []
    );
    const [sprintName, setSprintName] = useState('');
    const [ref, setRef] = useState(null as HTMLFormElement | null);

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    useEffect(() => {
        if (props.sprintUpdate.loaded) {
            // TODO: better communication with the user
            dispatch(props.resetSprintUpdateData());
            reset();
        }
    }, [props.sprintUpdate.loaded]);

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

        dispatch(await props.updateSprintData({sprintName, dataFile: file}));
    }

    return (
        <form ref={setRef} onSubmit={e => e.preventDefault()}>
            <h2>Update Sprint Data</h2>
            <div className="input">
                <Select elements={elements} elemKey={sprintName} onChange={setSprintName} />
            </div>
            <input type="file" name="sprintFile" onChange={onChangeFile} />
            <br /><br />
            <Button onClick={onClick}>
                Update CSV
            </Button>
        </form>
    );
}

export default connector(SprintUpdateData);
