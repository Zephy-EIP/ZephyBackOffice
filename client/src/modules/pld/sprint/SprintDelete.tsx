import Button from '@/components/buttons/Button';
import { deleteSprint, getSprintListNames, resetDeleteSprint } from '@/modules/pld/sprint/sprintReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from './SprintDelete.module.scss';

const mapStateToProps = (state: RootState) => {
    return {
        delSprint: state.sprint.deleteSprint,
        sprintNames: state.sprint.listNames,
    };
}

const connector = connect(mapStateToProps, { getSprintListNames, deleteSprint, resetDeleteSprint });

function SprintDelete(props: ConnectedProps<typeof connector> & {
    sprintName: string,
    onReset: () => void,
}) {
    const dispatch = useThunkDispatch();
    const [msg, setMsg] = useState(null as React.ReactNode | null);

    useEffect(() => {
        if (!props.delSprint.loaded)
            return;
        dispatch(props.resetDeleteSprint());
        reset();
        if (props.delSprint.success) {
            (async () => dispatch(await props.getSprintListNames()))();
            setMsg(
                <div className="success">
                    Sprint deleted successfully.
                </div>
            );
        } else {
            setMsg(
                <div className="error">
                    Couldn't delete sprint.
                </div>
            );
        }
    }, [props.delSprint.loaded]);

    useEffect(() => {
        if (!props.sprintNames.loaded && !props.sprintNames.loading) {
            (async () => dispatch(await props.getSprintListNames()))();
        }
    }, []);

    useEffect(() => {
        if (props.sprintName !== '')
            setMsg(null);
    }, [props.sprintName]);

    function reset() {
        props.onReset();
    }

    async function deletefct() {
        if (props.sprintName === '')
            return;
        dispatch(await props.deleteSprint({sprintName: props.sprintName}));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <div className={'quicksand-medium ' + styles.title}>
                Delete Sprint
            </div>
            {msg}
            <Button disabled={props.sprintName === ''} className={styles.buttonDelete} onClick={deletefct}>
                Delete Sprint
            </Button>
        </form>
    );
}

export default connector(SprintDelete);

