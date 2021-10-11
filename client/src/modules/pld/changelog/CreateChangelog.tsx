import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import { createChangelog, getChangelogList, resetChangelogCreate } from '@/modules/pld/changelog/changelogReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        create: state.changelog.create,
    };
}

const connector = connect(mapStateToProps, { createChangelog, getChangelogList, resetChangelogCreate });

function CreateChangelog(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [author, setAuthor] = useState('');
    const [version, setVersion] = useState('');
    const [sections, setSections] = useState('');
    const [comments, setComments] = useState('');

    useEffect(() => {
        if (!props.create.loaded)
            return;
        dispatch(props.resetChangelogCreate());
        reset();
        (async () => dispatch(await props.getChangelogList()))();
    }, [props.create.loaded])

    function reset() {
        setAuthor('');
        setVersion('');
        setSections('');
        setComments('');
    }

    async function create() {
        dispatch(await props.createChangelog({
            author,
            version,
            sections,
            comments,
        }));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Add Log</h2>
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
            <Button
                disabled={author === '' || version === '' || sections === '' || comments === ''}
                onClick={create}>
                Create Log
            </Button>
        </form>
    );
}

export default connector(CreateChangelog);
