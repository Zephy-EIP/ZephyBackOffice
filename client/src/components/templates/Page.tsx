import styles from './Page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.png'
import Button from '@/components/buttons/Button';
import { RootState, useThunkDispatch } from '@/utils/store';
import { logout } from '@/modules/auth/authReducer';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/token';
import { useRouter } from 'next/router';
import { getUser } from '@/modules/userReducer';
import User from '@/entities/User';
import { userDataGetWithExpiry, userDataSetWithExpiry } from '@/utils/localStorageUtils';
import SideMenu from '@/components/templates/sideMenu/SideMenu';
import getSideMenuConfig from '@/utils/getSideMenuConfig';

const mapStateToProps = (state: RootState) => {
    return {
        auth: {
            logout: {
                ...state.auth.logout
            },
            unauthed: state.auth.unauthed,
        },
        user: { ...state.user },
    }
}

const connector = connect(mapStateToProps, { logout, getUser });

/// This header requires the user to be connected.
/// If disconnected, he will be redirected to /login
function Page(props: {
    children?: React.ReactNode,
} & ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const router = useRouter();
    const [user, setUser] = useState(null as User | null);
    const sideMenuConfig = getSideMenuConfig();

    useEffect(() => {
        if (getToken() === null)
            router.push('/login');
    }, [props.auth.unauthed, props.auth.logout.loaded]);

    useEffect(() => {
        const user = userDataGetWithExpiry<User>('user');
        if (user !== null) {
            setUser(user);
            return;
        }
        const machin = async () => {
            dispatch(await props.getUser());
        }

        machin();
    }, []);

    useEffect(() => {
        if (props.user.user !== null) {
            userDataSetWithExpiry('user', props.user.user, 300000);
            setUser(props.user.user);
        }
    }, [props.user.user]);

    if (user === null)
        return <></>; // TODO loading

    return (
        <>
            <div className={styles.header}>
                <Link href="/">
                    <div className={styles.logo}>
                        <div className={styles.logoImg}>
                            <Image src={logo} />
                        </div>
                        <div className={`${styles.logoText} quicksand-medium`}>
                            ZEPHY
                        </div>
                    </div>
                </Link>
                <div className={styles.spacer} />
                <Link href="/profile">
                    <div className={styles.username}>{user?.username || ''}</div>
                </Link>
                <Button onClick={async () => {dispatch(await props.logout())} }>Logout</Button>
            </div>
            <div className={styles.content}>
                <SideMenu options={sideMenuConfig} userImportance={0} />
                <div className={styles.pageContent}>
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default connector(Page);
