import LinkButton from "@/components/buttons/LinkButton";
import BasicPage from "@/components/templates/SideLogoPage";
import styles from "./DisconnectedHomePage.module.scss";

export default function DisconnectedHomePage() {
    return (
        <BasicPage>
            <h2 className={styles.title}>
                Welcome to<br/><span className="purple">Zephy</span>'s Back Office
            </h2>
            <p>Please login into your account to use the Back Office.</p>
            <LinkButton href="/login" text="Login" className={styles.loginButton} />
        </BasicPage>
    );
}
