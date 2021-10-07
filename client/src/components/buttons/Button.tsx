import styles from './Button.module.scss';

interface Props {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
    loading?: boolean,
    type?: 'button' | 'submit' | 'reset',
}

export default function Button(props: Props) {
    let className = `${styles.linkButton} white quicksand-medium`;
    if (props.className !== undefined)
        className += ' ' + props.className;

    if (props.disabled === true)
        className += ` ${styles.buttonDisabled}`;

    if (props.loading === true)
        className += ` ${styles.buttonLoading}`;

    return (
        <button
            type={props.type}
            className={className}
            onClick={props.onClick}
            disabled={props.disabled || false}>
            {props.children}
        </button>
    );
}
