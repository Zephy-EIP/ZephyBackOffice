import Select, { SelectElement } from '@/components/selectors/Select';
import SprintDelete from '@/modules/pld/sprint/SprintDelete';
import { getSprintListNames } from '@/modules/pld/sprint/sprintReducer';
import SprintUpdateData from '@/modules/pld/sprint/SprintUpdateData';
import SprintUpdateName from '@/modules/pld/sprint/SprintUpdateName';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        sprintNames: state.sprint.listNames,
    };
}

const connector = connect(mapStateToProps, {
    getSprintListNames,
});

function SprintUpdate(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [sprintName, setSprintName] = useState('');
    const elements: SelectElement[] = [new SelectElement('Choose sprint...', '')].concat(
        props.sprintNames.list?.map(value => new SelectElement(value, value)) || []
    );

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading)
            (async () => dispatch(await props.getSprintListNames()))();
    }, []);

    const reset = () => {
        setSprintName('');
    }

    return (
        <div>
            <h2>Update Sprint</h2>
            <div className="quicksand-medium">
                Choose sprint
            </div>
            <div className="input">
                <Select elements={elements} elemKey={sprintName} onChange={setSprintName} />
            </div>
            <SprintUpdateData sprintName={sprintName} onReset={reset} />
            <br />
            <SprintUpdateName sprintName={sprintName} onReset={reset} />
            <br />
            <SprintDelete sprintName={sprintName} onReset={reset} />
        </div>
    );
}

export default connector(SprintUpdate);
