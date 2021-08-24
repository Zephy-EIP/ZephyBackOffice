import LinkButton from "@/components/buttons/LinkButton";
import ElipseLogo from "@/components/logos/elipse/ElipseLogo";
import TitleLogo from "@/components/logos/title/TitleLogo";
import styles from "./DisconnectedHomePage.module.scss";

export default function DisconnectedHomePage() {
    return (
        <main>
            <ElipseLogo />
            <div className={styles.wrapper}>
                <TitleLogo />
                <h2>
                    Welcome to<br /><span className="purple">Zephy</span>'s Back Office
                </h2>
                <p>Please login into your account to use the Back Office.</p>
                <LinkButton href="/login" text="Login" className={styles.loginButton} />
            </div>
        </main>
    );
}
