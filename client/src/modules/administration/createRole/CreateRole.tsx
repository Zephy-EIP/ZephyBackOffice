import styles from './CreateRole.module.scss';
import { RootState, useThunkDispatch } from '@/utils/store';
import { connect, ConnectedProps } from 'react-redux';
import { createRole, getRoles, resetCreateRole } from '@/modules/roleReducer';
import { useEffect, useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import Button from '@/components/buttons/Button';
import { usernameIsValid } from '@/utils/utils';

const mapStateToProps = (state: RootState) => {
    return {
        role: state.role.createRole,
    };
}

const connector = connect(mapStateToProps, { createRole, resetCreateRole, getRoles });

function CreateRole(props: ConnectedProps<typeof connector>) {
    const [roleName, setRoleName] = useState('');
    const [roleImportance, setRoleImportance] = useState(null as number | null);
    const [info, setInfo] = useState(<></>);
    const dispatch = useThunkDispatch();

    useEffect(() => {
        if (props.role.loaded) {
            if (props.role.success) {
                (async () => {
                    console.log(await props.getRoles())
                })();
                setInfo(<div className={styles.success}>Role Created!</div>);
            } else
                setInfo(<div className={styles.error}>Error while creating role.</div>);
            dispatch(props.resetCreateRole());
        }
    }, [props.role.loaded]);

    const checkAndCreateRole = async () => {
        let name = roleName.trim();

        if (!usernameIsValid(name)) {
            setInfo(
                <div className={styles.error}>
                    Invalid role name.
                </div>
            );
            return;
        }
        if (roleImportance === null) {
            setInfo(
                <div className={styles.error}>
                    Role is empty.
                </div>
            );
            return;
        }
        setInfo(<></>);
        dispatch(await props.createRole({ displayName: name, importance: roleImportance }));
    }

    const parseRoleImportance = (e: string) => {
        try {
            const value = parseInt(e);
            if (value === 0)
                setRoleImportance(null);
            else
                setRoleImportance(value);
        } catch {}
    }

    return (
        <form onSubmit={e => e.preventDefault()} className={styles.wrapper}>
            <h2>Create Role</h2>
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
            {info}
            <Button onClick={checkAndCreateRole}>
                Create Role
            </Button>
        </form>
    );
}

export default connector(CreateRole);
