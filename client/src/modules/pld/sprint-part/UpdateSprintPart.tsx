import { RootState, useThunkDispatch } from '@/utils/store';
import { connect, ConnectedProps } from 'react-redux';
import { updateSprintPart, deleteSprintPart, getSprintPartList, resetSprintPartDelete, resetSprintPartUpdate } from '@/modules/pld/sprint-part/sprintPartReducer';
import Select, { SelectElement } from '@/components/selectors/Select';
import { useEffect, useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import Button from '@/components/buttons/Button';
import styles from './SprintPart.module.scss';

const mapStateToProps = (state: RootState) => {
    return {
        update: state.sprintPart.update,
        delete: state.sprintPart.delete,
        list: state.sprintPart.list,
    };
}

const connector = connect(mapStateToProps, {updateSprintPart, deleteSprintPart, getSprintPartList, resetSprintPartDelete, resetSprintPartUpdate});

function UpdateSprintPart(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [sprintPartId, setSprintPartId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const elems: SelectElement[] = [new SelectElement('Choose sprint part...', '')].concat(
        props.list.list?.map(value => new SelectElement(`${value.sprint_name} | ${value.type}`, value.id.toString())) || []
    );

    useEffect(() => {
        if (!props.list.loaded && !props.list.loading)
            (async () => dispatch(await props.getSprintPartList()))();
    }, []);

    useEffect(() => {
        if (!props.update.loaded && !props.delete.loaded)
            return;
        if (props.delete.loaded)
            dispatch(props.resetSprintPartDelete());
        if (props.update.loaded)
            dispatch(props.resetSprintPartUpdate());
        if (props.update.success || props.delete.success)
            (async () => dispatch(await props.getSprintPartList()))();
        reset();
    }, [props.delete.loaded, props.update.loaded])

    function reset() {
        setSprintPartId('');
        setTitle('');
        setDescription('');
    }

    async function updateFct() {
        if (title === '' || sprintPartId === '')
            return;

        dispatch(await props.updateSprintPart({
            id: parseInt(sprintPartId),
            title,
            description
        }));
    }

    async function deleteFct() {
        if (sprintPartId === '')
            return;
        dispatch(await props.deleteSprintPart({
            id: parseInt(sprintPartId)
        }));
    }

    const date = new Date();
    const titlePlaceHolder = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                           + ` - Rapport d'avancement pour...`;

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Update Sprint Part</h2>
            <div className="quicksand-medium">Choose sprint part</div>
            <div className="input">
                <Select
                    elemKey={sprintPartId}
                    onChange={setSprintPartId}
                    elements={elems}
                />
            </div>
            <div className="quicksand-medium">Title</div>
            <TextInput className="input" placeholder={titlePlaceHolder} value={title} onChange={setTitle} />
            <div className="quicksand-medium">Description</div>
            <TextInput
                type="textarea"
                className="input"
                placeholder="L'ensemble de l'équipe a..."
                value={description} onChange={setDescription} />
            <Button onClick={updateFct}>
                Update Sprint Part
            </Button>
            <Button
                onClick={deleteFct}
                className={styles.btnOrange}>
                Delete
            </Button>
        </form>
    );
}

export default connector(UpdateSprintPart);
