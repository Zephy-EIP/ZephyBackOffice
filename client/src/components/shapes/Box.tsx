import styles from './Box.module.scss';

interface Props {
    children: React.ReactNode,
    styleCasses?: string[],
}

export default function Box(props: Props) {
    let className = styles.box;
    if (props.styleCasses !== undefined) {
        props.styleCasses.forEach(name => {
            className += ` ${name}`
        });
    }
    return (
        <div className={className}>
            {props.children}
        </div>
    );
}
