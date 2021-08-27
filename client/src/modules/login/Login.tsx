import Button from "@/components/buttons/Button";
import Box from "@/components/shapes/Box";
import BasicPage from "@/components/template/BasicPage";
import { RootState } from "@/utils/store";
import { connect, ConnectedProps } from "react-redux";
import { login } from "@/modules/login/authReducer";
import TextInput from "@/components/inputs/TextInput";
import styles from './Login.module.scss';

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

interface Props extends ConnectedProps<typeof connector> {
}

const Login = (props: Props) => {

    return (
        <BasicPage>
            <Box styleCasses={[styles.box]}>
                <h2 className="purple">LOGIN</h2>
                <div className={`quicksand-medium ${styles.label}`}>Email</div>
                <TextInput styleCasses={[styles.input]} placeholder="example@email.com" />
                <div className={`quicksand-medium ${styles.label}`}>Password</div>
                <TextInput styleCasses={[styles.input]} placeholder="Password123" type="password" />
                <Button styleCasses={[styles.button]} onClick={() => {console.log('aha')} }>Login</Button>
            </Box>
        </BasicPage>
    );
}

export default connector(Login);
