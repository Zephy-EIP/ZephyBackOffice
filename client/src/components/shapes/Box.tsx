import { CSSProperties } from 'react';
import styles from './Box.module.scss';

interface Props {
    children: React.ReactNode,
    className?: string,
    style?: CSSProperties,
}

export default function Box(props: Props) {
    let className = styles.box;
    if (props.className !== undefined) {
        className += ' ' + props.className;
    }
    return (
        <div className={className} style={props.style}>
            {props.children}
        </div>
    );
}
