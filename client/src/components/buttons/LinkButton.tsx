import Link from 'next/link';
import styles from './Button.module.scss'

interface Props {
    href: string,
    text: string,
    className?: string,
}

const LinkButton = (props: Props) => {
    let className = (props.className !== undefined ? `${props.className} ` : '') + styles.linkButton;
    return (
        <Link href={props.href}>
            <div className={className + ' white quicksand-medium'}>
                {props.text}
            </div>
        </Link>
    )
}

export default LinkButton;
