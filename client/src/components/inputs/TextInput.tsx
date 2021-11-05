import { useEffect, useRef, useState } from 'react';
import styles from './TextInput.module.scss';
import showPasswordIcon from '@/assets/images/icons/red-eye.svg';
import hidePasswordIcon from '@/assets/images/icons/invisible.svg';
import Image from 'next/image';

interface Props {
    onChange?: (value: any) => void
    placeholder?: string,
    className?: string,
    type?: string,
    id?: string,
    autoComplete?: string,
    disabled?: boolean,
    value?: string,
    min?: string,
    max?: string,
};

export default function TextInput(props: Props) {
    let className = styles.input;
    let classNameWrapper = styles.wrapper;
    const [showPassword, setShowPassword] = useState(false);
    if (props.className !== undefined) {
        classNameWrapper += ' ' + props.className;
    }
    const ref = useRef<HTMLInputElement>(null);

    if (props.disabled) {
        className += ' ' + styles.disabled;
    } else if (props.type === 'password') {
        className += ' ' + styles.password;
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

    let passwordStyle = styles.passwordButton;
    let type = props.type || 'text';
    if (props.type === 'password' && showPassword) {
        type = 'text';
    }

    let icon = showPasswordIcon;
    if (showPassword) {
        icon = hidePasswordIcon;
    }

    if (props.type === 'textarea')
        return (
            <div className={classNameWrapper}>
                <textarea
                    id={props.id}
                    className={`${className} quicksand-regular`}
                    onChange={e => {
                        if (props.onChange)
                            props.onChange(e.target.value)
                    }}
                    placeholder={props.placeholder}
                    autoComplete={props.autoComplete}
                    disabled={props.disabled}
                    value={props.value}
                />
            </div>
        );

    return (
        <div className={classNameWrapper}>
            <input
                id={props.id}
                ref={ref}
                className={className}
                onChange={e => {
                    if (props.onChange)
                        props.onChange(e.target.value)
                }}
                type={type}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
                disabled={props.disabled}
                value={props.value}
                min={props.min}
                max={props.max}
            />
            {props.disabled !== true && props.type === 'password' &&
             <button
                 type="button"
                 className={passwordStyle}
                 onClick={() => setShowPassword(!showPassword) }
                 tabIndex={-1}>
                 <Image src={icon} width="20px" height="20px"/>
             </button>
            }
        </div>
    );
}
