import { useEffect, useRef } from "react";
import styles from './TextInput.module.scss';

interface Props {
    onChange?: (value: any) => void
    placeholder?: string,
    className?: string,
    type?: string,
    id?: string,
    autoComplete?: string,
    disabled?: boolean,
    value?: string,
};

export default function TextInput(props: Props) {
    let className = `${styles.input}`;
    if (props.className !== undefined) {
        className += ' ' + props.className;
    }
    const ref = useRef<HTMLInputElement>(null);

    if (props.disabled) {
        className += ' ' + styles.disabled;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (ref.current) {
                clearInterval(interval);
                if (props.onChange) {
                    props.onChange(ref.current.value);
                }
            }
        }, 100);
    }, []);

    return (
        <div>
            <input
                id={props.id}
                ref={ref}
                className={className}
                onChange={e => {
                    if (props.onChange)
                        props.onChange(e.target.value)
                }}
                type={props.type || 'text'}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
                disabled={props.disabled}
                value={props.value}
            />
        </div>
    );
}
