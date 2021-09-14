import Page from "@/components/templates/Page";
import BasicHeader from "@/modules/BasicHeader";
import CreateAccount from "@/modules/administration/createAccount/CreateAccount";
import styles from './Administration.module.scss';

export default function Administration() {
    return (
        <>
            <BasicHeader title="Administration | Zephy Back Office" />
            <main>
                <Page>
                    <div className={styles.wrapper}>
                        <CreateAccount />
                    </div>
                </Page>
            </main>
        </>
    )
}
