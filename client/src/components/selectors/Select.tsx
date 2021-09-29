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
    const [open, setOpen] = useState(false);
    const [chosenElem, setChosenElem] = useState(new SelectElement(props.defaultTitle || 'Choose value...', ''));

    let className = styles.select;
    if (props.enabled === false)
        className += ' ' + styles.selectDisabled;
    else if (open)
        className += ' ' + styles.selectOpen;

    if (props.elemKey !== undefined && props.elemKey !== chosenElem.key) {
        for (const elem of props.elements)
            if (elem.key === props.elemKey)
                setChosenElem(elem);
    }

    const elem = props.elements.find(e => { return e.key === chosenElem.key });
    if (elem !== undefined && elem.title !== chosenElem.title) {
        setChosenElem(elem);
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
                    title={chosenElem.title} >
                    {chosenElem.title}
                </button>
                <div className={styles.dropdown}>
                    {
                        props.elements.map((elem, index) => {
                            let className: string = '';
                            if (index === props.elements.length - 1)
                                className = styles.buttonLast;
                            if (chosenElem.key === elem.key) {
                                className += ' ' + styles.buttonChosen;
                            }
                            return (
                                <button
                                    className={className}
                                    onClick={() => {
                                        props.onChange?.call('', elem.value);
                                        setOpen(false);
                                        setChosenElem(elem);
                                    }}
                                    title={elem.title}
                                    key={elem.key} >
                                    {elem.title}
                                </button>
                            );
                        })
                    }
                </div>
                <button className={styles.closeButton} onClick={() => { setOpen(false); }}>
                </button>
            </div>
        </>
    );

}
