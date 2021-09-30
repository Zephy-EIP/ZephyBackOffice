import Button from '@/components/buttons/Button';
import Select, { SelectElement } from '@/components/selectors/Select';
import User from '@/entities/User';
import { getRoles } from '@/modules/roleReducer';
import { getUserList } from '@/modules/userReducer';
import { changeUserRole, resetUserUpdateRole } from '@/modules/userUpdateReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from './UpdateUser.module.scss';

const mapStateToProps = (state: RootState) => {
    return {
        userList: state.user.userList,
        updateUserRole: state.userUpdate.role,
        roleList: state.role.roleList,
    };
}

const connector = connect(mapStateToProps, { getUserList, getRoles, changeUserRole, resetRoleUpdate: resetUserUpdateRole });

function UpdateUser(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [user, setUser] = useState(null as null | User);
    const [roleId, setRoleId] = useState(null as null | number);
    const [roles, setRoles] = useState([new SelectElement('No Role', 'null')]);
    const [users, setUsers] = useState([] as SelectElement[]);
    const [info, setInfo] = useState(<></>);

    useEffect(() => {
        if (!props.userList.loaded && !props.userList.loading)
            (async () => { dispatch(await props.getUserList()) })();
        if (!props.roleList.loaded && !props.roleList.loading)
            (async () => { dispatch(await props.getUserList()) })();
    }, []);

    useEffect(() => {
        if (!props.userList.loaded || !props.roleList.loaded)
            return;
        const userList: SelectElement[] = [];
        const roleList: SelectElement[] = [new SelectElement('No Role', 'null')];

        props.userList.users?.forEach(user => {
            if (user.role_id !== null) {
                const r = props.roleList.roles!.find(role => role.id === user.role_id);
                if (r?.importance === 0)
                    return;
            }
            userList.push(new SelectElement(`${user.email} | ${user.username}`, user.id.toString()));
        }) || [];

        props.roleList.roles?.forEach(role => {
            if (role.importance <= 0)
                return;
            roleList.push(new SelectElement(role.display_name, role.id.toString()));
        });

        setRoles(roleList);
        setUsers(userList);
    }, [props.userList.loaded, props.roleList.loaded]);

    useEffect(() => {
        if (props.updateUserRole.loaded) {
            if (props.updateUserRole.success) {
                setInfo(<div className={styles.success}>Role Changed!</div>);
                (async () => { dispatch(await props.getUserList()); })();
                setUser(null);
            } else {
                setInfo(<div className={styles.error}>Error when changing role.</div>);
            }
            dispatch(props.resetRoleUpdate());
        }
    }, [props.updateUserRole.loaded]);


    function selectHandler(value: string) {
        setInfo(<></>);
        if (value === 'null') {
            setUser(null);
            return;
        }
        const id = parseInt(value);
        if (id === NaN)
            return;
        const u = props.userList.users?.find(user => user.id == id);
        if (!u)
            return;
        setUser(u);
        if (u.role_id === null) {
            setRoleId(null);
            return;
        }
        const role = roles.find(role => role.key === u.role_id.toString());
        if (role) setRoleId(parseInt(role.key));
    }

    function selectHandlerRoles(value: string) {
        if (value === 'null') {
            setRoleId(null);
            return;
        }
        const id = parseInt(value);
        if (id !== NaN)
            setRoleId(id);
    }

    async function updateRoleFct() {
        setInfo(<></>);
        if (user === null)
            return;
        dispatch(await props.changeUserRole({ userId: user.id, newRoleId: roleId }));
    }

    return (
        <form className={styles.wrapper} onSubmit={e => e.preventDefault()}>
            <h2>Update User</h2>

            <div className="quicksand-medium">User</div>
            <div className={styles.input}>
                <Select
                    elements={[new SelectElement('Choose User...', 'null')].concat(users)}
                    onChange={selectHandler}
                    elemKey={user?.id.toString() || 'null'}
                    enabled={!props.updateUserRole.loading && !props.updateUserRole.loading } />
            </div>
            <div className="quicksand-medium">Role</div>
            <div className={styles.roleSelect}>
                <Select
                    elements={roles}
                    onChange={selectHandlerRoles}
                    elemKey={`${roleId}`}
                    enabled={ !props.updateUserRole.loading && user !== null } />
            </div>
            {info}
            <Button
                onClick={updateRoleFct}
                disabled={ user === null || user?.role_id === roleId }>
                Update User
            </Button>

        </form>
    );
}

export default connector(UpdateUser);
