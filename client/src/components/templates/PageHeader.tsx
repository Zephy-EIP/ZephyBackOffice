import styles from './PageHeader.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.png'

export default function PageHeader(props: {
    children: React.ReactNode
}) {
    return (
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
            {props.children}
        </div>
    );
}
