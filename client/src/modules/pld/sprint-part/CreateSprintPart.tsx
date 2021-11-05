import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import Select, { SelectElement } from '@/components/selectors/Select';
import { createSprintPart, getSprintPartList, resetSprintPartCreate } from '@/modules/pld/sprint-part/sprintPartReducer';
import { getSprintListNames } from '@/modules/pld/sprint/sprintReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        sprintNames: state.sprint.listNames,
        sprintParts: state.sprintPart.list,
        sprintPartCreate: state.sprintPart.create,
    };
}

const connector = connect(mapStateToProps, {
    getSprintListNames,
    createSprintPart,
    getSprintPartList,
    resetSprintPartCreate
});

function CreateSprintPart(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [sprint, setSprint] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const sprintElements: SelectElement[] = [new SelectElement('Choose sprint...', '')].concat(
        props.sprintNames.list?.map(value => new SelectElement(value, value)) || []
    );

    const typeElems: SelectElement[] = [
        new SelectElement('Choose Type...', ''),
        new SelectElement('Kick Off', 'KO'),
        new SelectElement('Follow up', 'FU'),
        new SelectElement('Delivery', 'D'),
    ]

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    useEffect(() => {
        if (!props.sprintPartCreate.loaded)
            return;
        if (props.sprintPartCreate.success)
            (async () => dispatch(await props.getSprintPartList()))();
        reset();
        dispatch(props.resetSprintPartCreate());
    }, [props.sprintPartCreate.loaded]);

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
        if (type !== 'KO' && type !== 'FU' && type !== 'D')
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

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Create Sprint Part</h2>
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
            <Button onClick={createSP}>
                Create Sprint Part
            </Button>
        </form>
    );
}

export default connector(CreateSprintPart);
