import Image from 'next/image';
import styles from './TitleLogo.module.scss';
import logo from '@/assets/images/logo.png';

export default function TitleLogo() {
    return (
        <div className={styles.titleLogo}>
            <Image src={logo} />
            <h1>Zephy</h1>
        </div>
    );
}
