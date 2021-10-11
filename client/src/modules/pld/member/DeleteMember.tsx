import Button from '@/components/buttons/Button';
import Select, { SelectElement } from '@/components/selectors/Select';
import {  deleteMember, getMemberList, resetDeleteMember } from '@/modules/pld/member/memberReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        list: state.member.list,
        delete: state.member.delete,
    };
}

const connector = connect(mapStateToProps, { deleteMember, getMemberList, resetDeleteMember });

function DeleteMember(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [member, setMember] = useState('');

    const elements: SelectElement[] = [new SelectElement('Choose member...', '')].concat(
        props.list.list?.map(value => new SelectElement(value.member_name, value.member_name)) || []
    );

    useEffect(() => {
        if (!props.list.loading && !props.list.loaded)
            (async () => dispatch(await props.getMemberList()))();
    }, []);

    useEffect(() => {
        if (!props.delete.loaded)
            return;
        if (props.delete.success)
            (async () => dispatch(await props.getMemberList()))();
        dispatch(props.resetDeleteMember());
        reset();
    }, [props.delete.loaded])

    function reset() {
        setMember('');
    }

    async function deletefct() {
        if (member === '')
            return;
        dispatch(await props.deleteMember({memberName: member}));
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2>Delete Member</h2>
            <div className="quicksand-medium">
                Choose member
            </div>
            <div className="input">
                <Select elements={elements} onChange={setMember} elemKey={member} />
            </div>
            <Button onClick={deletefct}>
                Delete Member
            </Button>
        </form>
    );
}

export default connector(DeleteMember);
