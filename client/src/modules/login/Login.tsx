import Button from "@/components/buttons/Button";
import Box from "@/components/shapes/Box";
import BasicPage from "@/components/template/BasicPage";
import { RootState, useThunkDispatch } from "@/utils/store";
import { connect, ConnectedProps } from "react-redux";
import { login } from "@/modules/login/authReducer";
import TextInput from "@/components/inputs/TextInput";
import styles from './Login.module.scss';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/utils/token";

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
    const [error, setError] = useState([] as React.ReactNode[]);

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
            err.push(<div className={styles.error}>Email is not valid</div>);
        if (checkPassword() === false)
            err.push(<div className={styles.error}>Password is empty</div>);
        if (err !== error)
            setError(err);
        return err.length === 0;
    }

    const checkAndLogin = async () => {
        if (!checkInput())
            return;
        dispatch(await props.login({email, password}));
    };

    useEffect(() => {
        if (getToken() !== null) {
            router.push('/');
        }
    });

    return (
        <BasicPage>
            <form onSubmit={(e) => {e.preventDefault()} }>
                <Box styleCasses={[styles.box]}>
                    <h2 className="purple">LOGIN</h2>
                    <div className={`quicksand-medium ${styles.label}`}>Email</div>
                    <TextInput styleCasses={[styles.input]} placeholder="example@email.com" onChange={e => {setEmail(e.target.value)}} />
                    <div className={`quicksand-medium ${styles.label}`}>Password</div>
                    <TextInput styleCasses={[styles.input]} placeholder="Password123" type="password" onChange={e => {setPassword(e.target.value)}} />
                    {error}
                    <Button styleCasses={[styles.button]} onClick={checkAndLogin} disabled={props.auth.login.loading}>Login</Button>
                </Box>
            </form>
        </BasicPage>
    );
}

export default connector(Login);
