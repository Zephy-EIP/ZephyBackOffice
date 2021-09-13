import Page from "@/components/templates/Page";
import BasicHeader from "@/modules/BasicHeader";
import ChangePassword from "@/modules/profile/changePassword/ChangePassword";
import styles from './Profile.module.scss';

export default function Profile() {
    return (
        <>
            <BasicHeader title="Profile | Zephy Back Office" />
            <main>
                <Page>
                    <div className={styles.wrapper}>
                        <ChangePassword />
                    </div>
                </Page>
            </main>
        </>
    );
}
