import Link from 'next/link';
import styles from './Button.module.scss'

interface Props {
    href: string;
    text: string;
    className: string | undefined;
}

const LinkButton = (props: Props) => {
    const className = (props.className !== undefined ? `${props.className} ` : '') + styles.linkButton;
    return (
        <Link  href={props.href}>
            <a className={'white quicksand-medium'}>
                <div className={className}>
                    {props.text}
                </div>
            </a>
        </Link>
    )
}

export default LinkButton
