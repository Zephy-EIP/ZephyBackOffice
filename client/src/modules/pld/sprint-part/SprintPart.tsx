import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import Select, { SelectElement } from '@/components/selectors/Select';
import { createSprintPart, deleteSprintPart, getSprintPartList, resetSprintPartCreate, resetSprintPartDelete, resetSprintPartUpdate, updateSprintPart } from '@/modules/pld/sprint-part/sprintPartReducer';
import { getSprintListNames } from '@/modules/pld/sprint/sprintReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from './SprintPart.module.scss';

const mapStateToProps = (state: RootState) => {
    return {
        sprintNames: state.sprint.listNames,
        sprintParts: state.sprintPart.list,
        sprintPartCreate: state.sprintPart.create,

        update: state.sprintPart.update,
        delete: state.sprintPart.delete,
    };
}

const connector = connect(mapStateToProps, {
    getSprintListNames,
    createSprintPart,
    getSprintPartList,
    resetSprintPartCreate,
    updateSprintPart,
    deleteSprintPart,
    resetSprintPartDelete,
    resetSprintPartUpdate
});

function SprintPart(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [sprint, setSprint] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [sprintPartId, setSprintPartId] = useState(undefined as number | undefined);
    const [msg, setMsg] = useState(undefined as React.ReactNode | undefined);

    const sprintElements: SelectElement[] = [new SelectElement('Choose sprint...', '')].concat(
        props.sprintNames.list?.map(value => new SelectElement(value, value)) || []
    );

    const typeElems: SelectElement[] = [
        new SelectElement('Choose Type...', ''),
        new SelectElement('Kick Off', 'KO'),
        new SelectElement('Follow up', 'FU'),
        new SelectElement('Follow up 2', 'FU2'),
        new SelectElement('Delivery', 'D'),
    ]

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    useEffect(() => {
        if (!props.sprintPartCreate.loaded)
            return;
        if (props.sprintPartCreate.success) {
            (async () => dispatch(await props.getSprintPartList()))();
            setMsg(
                <div className="success">
                    Created sprint part successfully.
                </div>
            );
        } else {
            setMsg(
                <div className="error">
                    Couldn't create sprint part. May already exist.
                </div>
            );
        }
        reset();
        dispatch(props.resetSprintPartCreate());
    }, [props.sprintPartCreate.loaded]);

    useEffect(() => {
        if (type !== '' || sprint !== '' || title !== '' || description !== '')
            setMsg(undefined)
    }, [type, sprint, title])

    useEffect(() => {
        if (sprint === '' || type === '') {
            setSprintPartId(undefined)
            return
        }
        const part = props.sprintParts.list?.find(part => part.sprint_name === sprint && part.type === type)
        if (part) {
            setSprintPartId(part.id)
            setTitle(part.title)
            setDescription(part.description)
        } else {
            setSprintPartId(undefined)
        }
    }, [sprint, type])

    useEffect(() => {
        if (!props.update.loaded && !props.delete.loaded)
            return;
        if (props.delete.loaded) {
            dispatch(props.resetSprintPartDelete())
            if (props.delete.success) {
                setMsg(
                    <div className="success">
                        Successfully delete sprint part.
                    </div>
                )
            } else {
                setMsg(
                    <div className="error">
                        Error while deleting sprint part.
                    </div>
                )
            }
        }
        if (props.update.loaded) {
            dispatch(props.resetSprintPartUpdate());
            if (props.update.success)
                setMsg(
                    <div className="success">
                        Successfully updated sprint part.
                    </div>
                )
            else
                setMsg(
                    <div className="error">
                        Error while updating sprint part.
                    </div>
                )
        }
        if (props.update.success || props.delete.success)
            (async () => dispatch(await props.getSprintPartList()))();
        reset();
    }, [props.delete.loaded, props.update.loaded])

    const date = new Date();
    const titlePlaceHolder = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        + ` - Rapport d'avancement pour...`;

    function reset() {
        setDescription('');
        setSprint('');
        setTitle('');
        setType('');
    }

    async function createSP() {
        if (type !== 'KO' && type !== 'FU' && type !== 'FU2' && type !== 'D')
            return;
        if (sprint === '' || title === '')
            return;
        props.createSprintPart({
            sprintName: sprint,
            title,
            description,
            partType: type
        })
    }

    async function updateFct() {
        if (title === '' || sprintPartId === undefined)
            return;

        dispatch(await props.updateSprintPart({
            id: sprintPartId,
            title,
            description
        }));
    }

    async function deleteFct() {
        if (sprintPartId === undefined)
            return;
        dispatch(await props.deleteSprintPart({
            id: sprintPartId
        }));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Sprint Parts</h2>
            <div className="quicksand-medium">Choose sprint</div>
            <div className="input">
                <Select elements={sprintElements} elemKey={sprint} onChange={setSprint} />
            </div>
            <div className="quicksand-medium">Choose type</div>
            <div className="input">
                <Select elements={typeElems} elemKey={type} onChange={setType} />
            </div>
            <div className="quicksand-medium">Title</div>
            <TextInput
                className="input"
                onChange={setTitle}
                value={title}
                placeholder={titlePlaceHolder} />
            <div className="quicksand-medium">Description</div>
            <TextInput
                type="textarea"
                className="input"
                onChange={setDescription}
                value={description}
                placeholder="L'ensemble de l'équipe a..." />
            {msg}
            {sprintPartId === undefined
            ? <Button onClick={createSP} disabled={sprint === '' || title === '' || type === ''}>
                Create Sprint Part
            </Button>
            : <Button onClick={updateFct} disabled={sprint === '' || title === '' || type === ''}>
                Update Sprint Part
            </Button>
            }
            <Button
                onClick={deleteFct}
                disabled={sprintPartId === undefined}
                className={styles.btnOrange}>
                Delete
            </Button>
        </form>
    );
}

export default connector(SprintPart);
