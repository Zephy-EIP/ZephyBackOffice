import { RootState, useThunkDispatch } from '@/utils/store';
import { connect, ConnectedProps } from 'react-redux';
import { updateSprintPart, deleteSprintPart, getSprintPartList, resetSprintPartDelete, resetSprintPartUpdate } from '@/modules/pld/sprint-part/sprintPartReducer';
import Select, { SelectElement } from '@/components/selectors/Select';
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        if (!props.list.loaded && !props.list.loading)
            (async () => dispatch(await props.getSprintPartList()))();
    }, []);

    const elems: SelectElement[] = [new SelectElement('Choose sprint part...', '')].concat(
        props.list.list?.map(value => new SelectElement(`${value.sprint_name} | ${value.type}`, value.id.toString())) || []
    );

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Update Sprint Part</h2>
            <div className="quicksand-medium">
                Choose sprint part
            </div>
            <div className="input">
                <Select
                    elements={elems}
                />
            </div>
        </form>
    );
}

export default connector(UpdateSprintPart);
