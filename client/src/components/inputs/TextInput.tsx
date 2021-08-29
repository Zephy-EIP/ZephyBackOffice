import { createRef, useEffect, useRef } from "react";
import styles from './TextInput.module.scss';

interface Props {
    onChange?: (value: any) => void
    placeholder?: string,
    styleCasses?: string[],
    type?: string,
};

export default function TextInput(props: Props) {
    let className = `${styles.input}`;
    if (props.styleCasses !== undefined) {
        props.styleCasses.forEach(name => {
            className += ` ${name}`
        });
    }
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (ref.current) {
                if (props.onChange) {
                    props.onChange(ref.current.value);
                }
                clearInterval(interval);
            }
        }, 100);
    }, []);

    return (
        <div>
            <input
                ref={ref}
                className={className}
                onChange={e => props.onChange?(e.target.value) : undefined}
                type={props.type || 'text'}
                placeholder={props.placeholder}
            />
        </div>
    );
}
