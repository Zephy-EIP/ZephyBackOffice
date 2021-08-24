import Image from 'next/image';
import LogoWhite from '@/assets/images/logo-white.png';
import styles from './ElipseLogo.module.scss';

export default function ElipseLogo() {
    return (
        <div className={styles.elipse}>
            <div className={styles.wrapper}>
                <Image src={LogoWhite} alt="Elipse logo" layout="fill" />
            </div>
        </div>
    );
}
