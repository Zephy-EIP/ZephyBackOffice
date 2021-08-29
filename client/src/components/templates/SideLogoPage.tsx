import ElipseLogo from "@/components/logos/elipse/ElipseLogo";
import TitleLogo from "@/components/logos/title/TitleLogo";
import styles from "./SideLogoPage.module.scss";

interface Props {
    children: React.ReactNode
}

export default function BasicPage(props: Props) {
    return (
        <main>
            <ElipseLogo />
            <div className={styles.wrapper}>
                <TitleLogo />
                {props.children}
            </div>
        </main>
    );
}
