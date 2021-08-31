import LinkButton from '@/components/buttons/LinkButton';
import { useRouter } from 'next/router';
import styles from './SideMenu.module.scss';

interface Props {
    options: { title: string, href: string, minImportance: number | null }[],
    userImportance: number,
}

export default function SideMenu(props: Props) {
    const options: React.ReactNode[] = [];
    const router = useRouter();

    props.options.forEach(option => {
        let className = styles.sideMenuButton;
        if (router.route === option.href)
            className += ` ${styles.sideMenuButtonActive}`;

        options.push(
            <LinkButton
                key={option.href + ' ' + option.title}
                href={option.href}
                text={option.title}
                className={className}

            />
        );
    })

    return (
        <div className={styles.sideMenu}>
            {options}
        </div>
    );
}
