import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import { createMember, getMemberList, resetCreateMember } from '@/modules/pld/member/memberReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        list: state.member.list,
        create: state.member.create,
    };
}

const connector = connect(mapStateToProps, {getMemberList, createMember, resetCreateMember});

function CreateMember(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [memberName, setMemberName] = useState('');

    useEffect(() => {
        if (!props.create.loaded)
            return;
        if (props.create.success)
            (async () => dispatch(await props.getMemberList()))();
        dispatch(props.resetCreateMember());
        reset();
    }, [props.create.loaded])

    async function createfct() {
        if (memberName === '')
            return;
        dispatch(await props.createMember({memberName}));
    }

    function reset() {
        setMemberName('');
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Create Member</h2>
            <div className="quicksand-medium">
                Member name
            </div>
            <TextInput className="input" placeholder="Joe Froid" onChange={setMemberName} value={memberName} />
            <Button onClick={createfct}>
                Create Member
            </Button>
        </form>
    );
}

export default connector(CreateMember);
