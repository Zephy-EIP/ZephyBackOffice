import Button from "@/components/buttons/Button";
import { RootState, useThunkDispatch } from '@/utils/store';
import { logout } from '@/modules/auth/authReducer';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect } from "react";
import { getToken } from "@/utils/token";
import { useRouter } from "next/router";

const mapStateToProps = (state: RootState) => {
    return {
        auth: {
            logout: {
                ...state.auth.logout
            }
        }
    }
}

const connector = connect(mapStateToProps, {logout});

function HomePage(props: ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const router = useRouter();

    useEffect(() => {
        if (getToken() === null)
            router.push('/login');
    }, [props.auth.logout.success, props.auth.logout.loaded]);

    return (
        <Button onClick={async () => {dispatch(await props.logout())}}>Logout</Button>
    );
}

export default connector(HomePage);
