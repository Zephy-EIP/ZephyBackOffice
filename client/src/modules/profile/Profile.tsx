import Page from "@/components/templates/Page";
import BasicHeader from "@/modules/BasicHeader";
import ChangePassword from "@/modules/profile/changePassword/ChangePassword";
import ChangeUsername from '@/modules/profile/changeUsername/ChangeUsername';
import styles from './Profile.module.scss';

export default function Profile() {
    return (
        <>
            <BasicHeader title="Profile | Zephy Back Office" />
            <main>
                <Page>
                    <div className={styles.wrapper}>
                        <ChangeUsername />
                        <ChangePassword />
                    </div>
                </Page>
            </main>
        </>
    );
}
