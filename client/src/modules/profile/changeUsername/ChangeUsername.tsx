import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';
import { getUser } from '@/modules/userReducer';
import { changeUserUsername, resetUserUpdateUsername } from '@/modules/userUpdateReducer';
import { RootState, useThunkDispatch } from "@/utils/store";
import { usernameIsValid } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import styles from './ChangeUsername.module.scss'

const mapStateToProps = (state: RootState) => {
    return {
        username: state.userUpdate.username,
    };
}

const connector = connect(mapStateToProps, { changeUserUsername, getUser, resetUserUpdateUsername });

function ChangeUsername(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [username, setUsername] = useState('');
    const [info, setInfo] = useState(<></>);

    useEffect(() => {
        if (props.username.loaded === true) {
            if (props.username.success === true) {
                setInfo(<div className={styles.success}>Username changed successfully!</div>);
                (async () => { dispatch(await props.getUser()) })();
            } else {
                setInfo(<div className={styles.error}>Error while changing username.</div>);
            }
            dispatch(props.resetUserUpdateUsername());
        }
    }, [props.username.loaded]);

    const changeUsername = async () => {
        if (props.username.loading)
            return;
        if (!usernameIsValid(username)) {
            setInfo(<div className={styles.error}>Invalid username.</div>);
            return;
        }
        setInfo(<></>);
        let newUsername = username.trim();
        dispatch(await props.changeUserUsername({ newUsername }));
    }

    return (
        <form onSubmit={e => e.preventDefault()} className={styles.wrapper}>
            <h2>Change your Username</h2>
            <div className="quicksand-medium">
                Username
            </div>
            <TextInput
                value={username}
                placeholder="Joe Froid"
                className={styles.input}
                onChange={setUsername} />
            {info}
            <Button onClick={changeUsername} loading={props.username.loading}>
                Change Username
            </Button>
        </form>
    );
}

export default connector(ChangeUsername);
