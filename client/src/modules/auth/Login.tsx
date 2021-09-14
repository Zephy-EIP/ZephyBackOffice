import Button from "@/components/buttons/Button";
import Box from "@/components/shapes/Box";
import BasicPage from "@/components/templates/SideLogoPage";
import { RootState, useThunkDispatch } from "@/utils/store";
import { connect, ConnectedProps } from "react-redux";
import { login } from "@/modules/auth/authReducer";
import TextInput from "@/components/inputs/TextInput";
import styles from './Login.module.scss';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/utils/token";
import BasicHeader from "@/modules/BasicHeader";

function mapStateToProps(state: RootState) {
    return {
        auth: {
            login: {
                ...state.auth.login
            },
        },
    }
}

const connector = connect(mapStateToProps, {login});

const Login = (props: ConnectedProps<typeof connector>) => {
    const router = useRouter();
    const dispatch = useThunkDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setInputError] = useState([] as React.ReactNode[]);
    const [credentialsErr, setCredErr] = useState(<></>);

    const checkEmail = (): boolean => {
        const emailValid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) && email.length < 255;
        return emailValid;
    };

    const checkPassword = (): boolean => {
        return password.length > 0;
    };

    const checkInput = (): boolean => {
        const err = [] as React.ReactNode[];
        if (checkEmail() === false)
            err.push(<div key="emailErr" className={styles.error}>Email is not valid</div>);
        if (checkPassword() === false)
            err.push(<div key="passwordErr" className={styles.error}>Password is empty</div>);
        if (err !== inputError)
            setInputError(err);

        return err.length === 0;
    }

    const checkAndLogin = async () => {
        if (!checkInput() || props.auth.login.loading)
            return;
        dispatch(await props.login({email, password}));
    };

    useEffect(() => {
        if (getToken() !== null) {
            router.push('/');
        }
    }, [props.auth.login.token]);

    useEffect(() => {
        if (props.auth.login.loaded && props.auth.login.success === false) {
            setCredErr(<div key="credErr" className={styles.error}>Invalid email and/or password</div>);
        } else if (credentialsErr !== <></>) {
            setCredErr(<></>);
        }
    }, [props.auth.login.success, props.auth.login.loaded]);

    return (
        <>
            <BasicHeader title="Login | Zephy Back Office" />
            <BasicPage>
                <form onSubmit={(e) => {e.preventDefault()} }>
                    <Box className={styles.box}>
                        <h2 className="purple">LOGIN</h2>
                        <div className={`quicksand-medium ${styles.label}`}>Email</div>
                        <TextInput className={styles.input} placeholder="example@email.com" onChange={setEmail} />
                        <div className={`quicksand-medium ${styles.label}`}>Password</div>
                        <TextInput className={styles.input} placeholder="Password123" type="password" onChange={setPassword} />
                        <div>
                            {inputError}
                            {credentialsErr}
                        </div>
                        <Button className={styles.button} onClick={checkAndLogin} loading={props.auth.login.loading}>Login</Button>
                    </Box>
                </form>
            </BasicPage>
        </>
    );
}

export default connector(Login);
