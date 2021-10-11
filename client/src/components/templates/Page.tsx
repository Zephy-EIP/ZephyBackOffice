import styles from './Page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.png'
import Button from '@/components/buttons/Button';
import { RootState, useThunkDispatch } from '@/utils/store';
import { logout, resetAuthReducer } from '@/modules/auth/authReducer';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/token';
import { useRouter } from 'next/router';
import { getUser } from '@/modules/userReducer';
import User from '@/entities/User';
import SideMenu from '@/components/templates/sideMenu/SideMenu';
import getSideMenuConfig from '@/utils/getSideMenuConfig';
import { getRoles } from '@/modules/roleReducer';
import { getUserRole } from '@/utils/utils';

const mapStateToProps = (state: RootState) => {
    return {
        auth: {
            logout: state.auth.logout,
            unauthed: state.auth.unauthed,
        },
        role: state.role,
        user: { ...state.user.user },
    }
}

const connector = connect(mapStateToProps, { logout, getUser, getRoles });

/// This header requires the user to be connected.
/// If disconnected, he will be redirected to /login
function Page(props: {
    children?: React.ReactNode,
} & ConnectedProps<typeof connector>) {
    const dispatch = useThunkDispatch();
    const router = useRouter();
    const [user, setUser] = useState(null as User | null);
    const sideMenuConfig = getSideMenuConfig();
    const [roleImportance, setRoleImportance] = useState(null as null | number);
    const [currentPageImportance, setPageImportance] = useState(null as null | number);

    useEffect(() => {
        if (getToken() === null)
            router.push('/login');
        dispatch(resetAuthReducer());
    }, [props.auth.unauthed, props.auth.logout.loaded]);

    useEffect(() => {
        if (!props.role.roleList.loading && !props.role.roleList.loaded)
            (async () => { dispatch(await props.getRoles()) })();
        if (!props.user.loading && !props.user.loaded)
            (async () => { dispatch(await props.getUser()); })();
        for (const page of sideMenuConfig) {
            if (page.href === router.route)
                setPageImportance(page.minImportance);
        }
    }, []);

    useEffect(() => {
        if (props.user.user !== null)
            setUser(props.user.user);
    }, [props.user.user]);

    useEffect(() => {
        if (props.user.user === null || props.role.roleList.roles === null)
            return;
        const role = getUserRole(props.user.user, props.role.roleList.roles);
        if (role === null)
            setRoleImportance(null);
        else
            setRoleImportance(role.importance);
    }, [props.user.user, props.role.roleList.roles])

    if (user === null || props.role.roleList === null)
        return <></>; // TODO loading

    let content = props.children;
    if (currentPageImportance !== null && roleImportance === null ||
        (currentPageImportance !== null && roleImportance !== null && currentPageImportance < roleImportance))
        content = (
            <div className={styles.pageContent}>
                <div style={{padding: 15}}>
                    <h1>
                        403 Forbidden
                    </h1>
                    <p>
                        You've got no business here.
                    </p>
                </div>
            </div>
        );

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
                <SideMenu options={sideMenuConfig} userImportance={roleImportance} />
                <div className={styles.pageContent}>
                    {content}
                </div>
            </div>
        </>
    );
}

export default connector(Page);
