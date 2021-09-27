import { useState } from 'react';
import styles from './Select.module.scss';

export class SelectElement {
    title: string;
    value: string;
    key: string;

    /// By default, key takes the value of value
    constructor(title: string, value: string, key?: string) {
        this.title = title;
        this.value = value;
        this.key = key || value;
    }
}

interface Props {
    elements: SelectElement[],
    defaultTitle?: string,
    onChange?: (value: string) => any,
    enabled?: boolean,
    elemKey?: string,
}

export default function Select(props: Props) {
    const [title, setTitle] = useState(props.defaultTitle || 'Choose value...');
    const [chosenId, setChosenId] = useState('' as null | string);
    const [open, setOpen] = useState(false);

    let className = styles.select;
    if (props.enabled === false)
        className += ' ' + styles.selectDisabled;
    else if (open)
        className += ' ' + styles.selectOpen;

    if (props.elemKey !== undefined && props.elemKey !== chosenId) {
        setChosenId(props.elemKey);
        for (const elem of props.elements)
            if (elem.key === props.elemKey)
                setTitle(elem.title);
    }

    return (
        <>
            <div className={className}>
                <button
                    className={styles.current}
                    onClick={() => {
                    if (props.enabled === false)
                        return;
                        setOpen(!open);
                }}
                    type="button"
                    title={title} >
                    {title}
                </button>
                <div className={styles.dropdown}>
                    {
                        props.elements.map((elem, index) => {
                            let className: string = '';
                            if (index === props.elements.length - 1)
                                className = styles.buttonLast;
                            if (chosenId === elem.key) {
                                className += ' ' + styles.buttonChosen;
                            }
                            return (
                                <button
                                    className={className}
                                    onClick={() => {
                                        props.onChange?.call('', elem.value);
                                        setTitle(elem.title);
                                        setOpen(false);
                                        setChosenId(elem.key);
                                    }}
                                    title={elem.title}
                                    key={elem.key} >
                                    {elem.title}
                                </button>
                            );
                        }
                        )
                    }
                </div>
                <button className={styles.closeButton} onClick={() => { setOpen(false); }}>
                </button>
            </div>
        </>
    );

}
