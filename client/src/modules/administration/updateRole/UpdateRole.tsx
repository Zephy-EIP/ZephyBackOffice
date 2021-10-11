import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import Select, { SelectElement } from '@/components/selectors/Select';
import { deleteRole, getRoles, resetDeleteRole, resetUpdateRole, updateRole } from '@/modules/roleReducer';
import { RootState, useThunkDispatch } from '@/utils/store';
import { usernameIsValid } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from './UpdateRole.module.scss';

const mapStateToProps = (state: RootState) => {
    return {
        roleUpdate: state.role.updateRole,
        roleDelete: state.role.deleteRole,
        roles: state.role.roleList,
    };
}

const connector = connect(mapStateToProps, { deleteRole, getRoles, updateRole, resetDeleteRole, resetUpdateRole });

function UpdateRole(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [roleId, setRoleId] = useState(null as null | number);
    const [roleImportance, setRoleImportance] = useState(null as null | number);
    const [roleName, setRoleName] = useState('');
    const [info, setInfo] = useState(<></>);

    useEffect(() => {
        if (!props.roles.loaded && !props.roles.loading)
            (async () => {dispatch(await props.getRoles())});
    }, []);

    useEffect(() => {
        if (props.roleUpdate.loaded)
            if (props.roleUpdate.success) {
                setInfo(<div className={styles.success}>Role Updated!</div>);
                dispatch(props.resetUpdateRole());
                (async () => {dispatch(await props.getRoles())})();
            } else {
                setInfo(<div className={styles.error}> Error while updating role.</div>)
            }
    }, [props.roleUpdate.loaded]);

    useEffect(() => {
        if (props.roleDelete.loaded)
            if (props.roleDelete.success) {
                setInfo(<div className={styles.success}>Role Deleted!</div>);
                resetFields();
                dispatch(props.resetDeleteRole());
                (async () => {dispatch(await props.getRoles())})();
            } else {
                setInfo(<div className={styles.error}> Error while deleting role.</div>)
            }
    }, [props.roleDelete.loaded]);

    let roles: SelectElement[] = [];
    props.roles.roles?.forEach(role => {
        if (role.importance <= 0)
            return;
        roles.push(new SelectElement(role.display_name, role.id.toString()));
    });

    const resetFields = () => {
        setRoleId(null);
        setRoleImportance(null);
        setRoleName('');
    }

    const parseRoleImportance = (e: string) => {
        try {
            const importance = parseInt(e)
            if (e === '' || importance === 0) {
                setRoleImportance(null);
                return;
            }
            setRoleImportance(importance);
        } catch {} }

    const selectHandler = (value: string) => {
        setInfo(<></>);
        if (value === 'null') {
            setRoleImportance(null);
            setRoleName('');
            setRoleId(null);
            return;
        }
        let id = parseInt(value);
        const role = props.roles.roles?.find(elem => {
            return elem.id === id;
        });
        if (role !== undefined) {
            setRoleImportance(role.importance);
            setRoleName(role.display_name);
            setRoleId(role.id);
        } else {
            setRoleImportance(null);
            setRoleName('');
            setRoleId(null);
        }
    }

    const roleUpdate = async () => {
        if (!usernameIsValid(roleName)) {
            setInfo(<div className={styles.error}>Invalid role name.</div>);
            return;
        }
        if (roleImportance === null) {
            setInfo(<div className={styles.error}>Role importance is empty.</div>);
            return;
        }
        setInfo(<></>);
        dispatch(await props.updateRole({ roleId: roleId!, displayName: roleName, importance: roleImportance }));
    }

    const roleDelete = async () => {
        setInfo(<></>);
        dispatch(await props.deleteRole({ roleId: roleId! }));
    }

    return (
        <form className={styles.wrapper} onSubmit={e => e.preventDefault()}>
            <h2>Update Role</h2>
            <div className="quicksand-medium">
                Role
            </div>
            <div className={styles.roleSelect}>
                <Select
                    elements={[new SelectElement('Choose Role...', 'null')].concat(roles)}
                    onChange={selectHandler}
                    elemKey={`${roleId}`}
                    enabled={!props.roleUpdate.loading && !props.roleDelete.loading } />
            </div>
            <div className="quicksand-medium">
                Role Name
            </div>
            <TextInput
                placeholder="User"
                className={styles.input}
                value={roleName}
                disabled={roleId === null || props.roleUpdate.loading || props.roleDelete.loading}
                onChange={setRoleName} />
            <div className="quicksand-medium">
                Role Importance
            </div>
            <TextInput
                placeholder="700"
                type="number"
                min="0"
                disabled={roleId === null || props.roleUpdate.loading || props.roleDelete.loading}
                className={styles.input}
                value={roleImportance?.toString() || ''}
                onChange={parseRoleImportance} />
            {info}
            <Button
                onClick={roleUpdate}
                disabled={roleId === null || props.roleUpdate.loading || props.roleDelete.loading}
                loading={props.roleUpdate.loading || props.roleDelete.loading}>
                Update Role
            </Button>
            <Button
                className={styles.buttonDelete}
                disabled={roleId === null}
                onClick={roleDelete}
                loading={props.roleUpdate.loading || props.roleDelete.loading}>
                Delete Role
            </Button>
        </form>
    );

}

export default connector(UpdateRole);
