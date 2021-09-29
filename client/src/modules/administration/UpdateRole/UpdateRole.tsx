import TextInput from '@/components/inputs/TextInput';
import Select, { SelectElement } from '@/components/selectors/Select';
import { deleteRole, getRoles, updateRole } from '@/modules/roleReducer';
import { RootState } from '@/utils/store';
import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from './UpdateRole.module.scss';

const mapStateToProps = (state: RootState) => {
    return {
        roleUpdate: state.role.updateRole,
        roleDelete: state.role.deleteRole,
        roles: state.role.roleList,
    };
}

const connector = connect(mapStateToProps, { deleteRole, getRoles, updateRole });

function UpdateRole(props: ConnectedProps<typeof connector>) {
    const [roleId, setRoleId] = useState(null as null | number);
    const [roleImportance, setRoleImportance] = useState(null as null | number);
    const [roleName, setRoleName] = useState('');

    let roles = props.roles.roles?.map(role => {
        return new SelectElement(role.display_name, role.id.toString());
    }) || [];

    const parseRoleImportance = (e: string) => { try { setRoleImportance(parseInt(e)); } catch {} }

    return (
        <form className={styles.wrapper} onSubmit={e => e.preventDefault()}>
            <h2>Update Role</h2>
            <div className="quicksand-medium">
                Role
            </div>
            <div className={styles.roleSelect}>
                <Select
                    elements={roles}
                    defaultTitle="Choose Role"
                    onChange={value => {
                        if (value === 'null')
                            setRoleId(null);
                        else
                            setRoleId(parseInt(value));
                    }}
                    enabled={!props.roleUpdate.loaded || props.roleDelete.loaded } />
            </div>
            <div className="quicksand-medium">
                Role Name
            </div>
            <TextInput
                placeholder="User"
                className={styles.input}
                value={roleName}
                onChange={setRoleName} />
            <div className="quicksand-medium">
                Role Importance
            </div>
            <TextInput
                placeholder="700"
                type="number"
                min="0"
                className={styles.input}
                value={roleImportance?.toString() || ''}
                onChange={parseRoleImportance} />
        </form>
    );

}

export default connector(UpdateRole);
