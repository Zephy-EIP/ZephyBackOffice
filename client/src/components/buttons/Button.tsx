import styles from './Button.module.scss';

interface Props {
    children: React.ReactNode,
    onClick?: () => void,
    styleCasses?: string[],
    disabled?: boolean
}

export default function Button(props: Props) {
    let className = `${styles.linkButton} white quicksand-medium`;
    if (props.styleCasses !== undefined) {
        props.styleCasses.forEach(name => {
            className += ` ${name}`
        });
    }

    if (props.disabled === true) {
        className += ` ${styles.buttonDisabled}`;
    }

    return (
        <button className={className} onClick={props.onClick} disabled={props.disabled || false}>
            {props.children}
        </button>
    );
}
