import React from 'react';
import Link from 'next/link';
import styles from './LinkButton.module.scss'

interface Props {
    href: string;
    text: string;
    className: string | undefined;
}

const LinkButton = (props: Props) => {
    const className = (props.className !== undefined ? `${props.className} ` : '') + styles.linkButton;
    return (
        <div className={className}>
            <Link  href={props.href}>
                <a className={'white quicksand-medium'}>{props.text}</a>
            </Link>
        </div>
    )
}

export default LinkButton
