import { CSSProperties } from 'react';
import styles from './Box.module.scss';

interface Props {
    children: React.ReactNode,
    styleCasses?: string[],
    style?: CSSProperties,
}

export default function Box(props: Props) {
    let className = styles.box;
    if (props.styleCasses !== undefined) {
        props.styleCasses.forEach(name => {
            className += ` ${name}`
        });
    }
    return (
        <div className={className} style={props.style}>
            {props.children}
        </div>
    );
}
