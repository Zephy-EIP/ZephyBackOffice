import { ChangeEvent } from "react";
import styles from './TextInput.module.scss';

interface Props {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
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
    return (
        <div>
            <input
                className={className}
                onChange={props.onChange}
                type={props.type || 'text'}
                placeholder={props.placeholder}
            />
        </div>
    );
}
