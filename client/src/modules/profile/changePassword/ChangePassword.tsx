import TextInput from "@/components/inputs/TextInput";
import { useEffect, useState } from "react";
import Button from '@/components/buttons/Button';
import styles from './ChangePassword.module.scss';
import { RootState, useThunkDispatch } from "@/utils/store";
import { connect, ConnectedProps } from "react-redux";
import { changePassword, resetPasswordChangeReducer } from '@/modules/profile/changePassword/changePasswordReducer';

const mapStateToProps = (state: RootState) => {
    return {
        passwordChange: state.passwordChange
    };
}

const connector = connect(mapStateToProps, { changePassword });

function ChangePassword(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const [inputError, setInputError] = useState(<></>);
    const [serverInfo, setServerInfo] = useState(<></>);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);

    const checkAndChangePassword = async () => {
        setServerInfo(<></>);
        if (oldPassword.length === 0 || newPassword.length === 0) {
            setInputError(
                <div className={styles.error}>
                    Passwords cannot be empty
                </div>
            );
            return;
        } else if (oldPassword === newPassword) {
            setInputError(
                <div className={styles.error}>
                    New password cannot be identical to current password.
                </div>
            );
            return;
        }
        setInputError(<></>);
        setButtonClicked(true);
        dispatch(await props.changePassword({oldPassword, newPassword}));
    }

    useEffect(() => {
        if (props.passwordChange.loaded && props.passwordChange.success === false)
            setServerInfo(
                <div className={styles.error}>
                    {props.passwordChange.error === 400 &&
                     <>Password should contain at least 8 characters, including at least one lowercase and one uppercase letter, a special character, and a digit.</>
                    }
                    {props.passwordChange.error !== 400 &&
                     <>Current password is invalid. Please try again.</>
                    }
                </div>
            )
        else if (props.passwordChange.loaded && props.passwordChange.success && buttonClicked)
            setServerInfo(
                <div className={styles.success}>
                    Password change successful!
                </div>
            );
        dispatch(resetPasswordChangeReducer());
    }, [props.passwordChange.loaded]);

    return (
        <form onSubmit={e => {e.preventDefault()}}>
            <h2 className={styles.title}>Change your password</h2>
            <div className={`quicksand-medium ${styles.label}`}>Current password</div>
            <TextInput className={styles.input} placeholder="Password123" type="password" onChange={setOldPassword} autoComplete="old-password" />
            <div className={`quicksand-medium ${styles.label}`}>New password</div>
            <TextInput className={styles.input} placeholder="Password124" type="password" onChange={setNewPassword} autoComplete="new-password" />
            <div>
                {inputError}
                {serverInfo}
            </div>
            <Button onClick={checkAndChangePassword} className={styles.button} loading={props.passwordChange.loading}>Change password</Button>
        </form>
    );
}

export default connector(ChangePassword);
