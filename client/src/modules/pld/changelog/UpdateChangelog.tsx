import Button from '@/components/buttons/Button';
import DeleteButton from '@/components/buttons/DeleteButton';
import TextInput from '@/components/inputs/TextInput';
import Select, { SelectElement } from '@/components/selectors/Select';
import { deleteChangelog, getChangelogList, resetChangelogDelete, resetChangelogUpdate, updateChangelog } from '@/modules/pld/changelog/changelogReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from './Changelog.module.scss';

const mapStateToProps = (state: RootState) => {
    return {
        list: state.changelog.list,
        update: state.changelog.update,
        delete: state.changelog.delete,
    };
}

const connector = connect(mapStateToProps, {
    deleteChangelog,
    getChangelogList,
    resetChangelogDelete,
    resetChangelogUpdate,
    updateChangelog
});

function UpdateChangelog(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [author, setAuthor] = useState('');
    const [version, setVersion] = useState('');
    const [sections, setSections] = useState('');
    const [comments, setComments] = useState('');
    const [date, setDate] = useState('');
    const [logId, setLogId] = useState('');
    const logs: SelectElement[] = [new SelectElement('Choose log...', '')]
        .concat(props.list.list?.map(elem =>
            new SelectElement(`${elem.version} | ${elem.author}`, elem.id.toString())
        ) || []);

    useEffect(() => {
        if (!props.list.loaded && !props.list.loading)
            (async () => dispatch(await props.getChangelogList()))();
    }, []);

    useEffect(() => {
        if (!props.update.loaded)
            return;
        if (props.update.success)
            (async () => dispatch(await props.getChangelogList()))();
        reset();
        dispatch(props.resetChangelogUpdate());
    }, [props.update.loaded]);

    useEffect(() => {
        if (!props.delete.loaded)
            return;
        if (props.delete.success)
            (async () => dispatch(await props.getChangelogList()))();
        reset();
        dispatch(props.resetChangelogDelete());
    }, [props.delete.loaded]);

    function reset() {
        setAuthor('');
        setVersion('');
        setSections('');
        setComments('');
        setDate('');
        setLogId('');
    }

    async function update() {
        dispatch(await props.updateChangelog({
            author,
            version,
            sections,
            comments,
            date,
            id: parseInt(logId)
        }));
    }

    async function deleteLog() {
        dispatch(await props.deleteChangelog({
            id: parseInt(logId)
        }));
    }

    function selectHandler(value: string) {
        setLogId(value);
        const id = parseInt(value);
        const elem = props.list.list?.find(elem => elem.id === id);
        setAuthor(elem?.author || '');
        setVersion(elem?.version || '');
        setSections(elem?.sections || '');
        setComments(elem?.comments || '');
        setDate(elem?.date.slice(0, 10) || '');
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Update Log</h2>
            <div className="quicksand-medium">Choose log</div>
            <div className="input">
                <Select
                    onChange={selectHandler}
                    elemKey={logId}
                    elements={logs} />
            </div>
            <div className="quicksand-medium">Version</div>
            <TextInput
                className="input"
                value={version}
                onChange={setVersion}
                placeholder="2.3" />
            <div className="quicksand-medium">Author</div>
            <TextInput
                className="input"
                value={author}
                onChange={setAuthor}
                placeholder="Benjamin Bourgeois" />
            <div className="quicksand-medium">Sections</div>
            <TextInput
                className="input"
                value={sections}
                onChange={setSections}
                placeholder="User stories et..." />
            <div className="quicksand-medium">Comments</div>
            <TextInput
                className="input"
                value={comments}
                onChange={setComments}
                placeholder="Ajout des..." />
            <div className="quicksand-medium">Date</div>
            <TextInput
                className="input"
                value={date}
                type="date"
                onChange={setDate}
                placeholder="DD/MM/YYYY" />
            <Button
                disabled={logId === '' || author === '' || version === '' || sections === '' || comments === '' || date === ''}
                onClick={update}>
                Update Log
            </Button>
            <DeleteButton
                itemName={`${version} | ${author}`}
                className={styles.btnOrange}
                disabled={logId === ''}
                onClick={deleteLog}>
                Delete
            </DeleteButton>
        </form>
    );
}

export default connector(UpdateChangelog);
