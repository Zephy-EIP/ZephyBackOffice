import Button, { ButtonProps } from '@/components/buttons/Button'
import TextInput from '@/components/inputs/TextInput'
import { useEffect, useState } from 'react'
import styles from './Button.module.scss'

export default function DeleteButton(props: ButtonProps & {
    itemName: string,
}) {
    const [overlay, setOverlay] = useState(false)
    const [input, setInput] = useState('')

    useEffect(() => {
        if (overlay === true)
            setInput('')
    }, [overlay])

    function deleteConfirmed() {
        setOverlay(false);
        props.onClick?.call(undefined);
    }

    return (
        <>
            <Button
                type={props.type}
                className={props.className}
                onClick={() => setOverlay(true)}
                disabled={props.disabled}>
                {props.children}
            </Button>
            <div className={styles.overlay + (!overlay ? ` ${styles.hide}` : '')}>
                <div className={styles.backButton} onClick={() => setOverlay(false)} />
                <div className={styles.popup}>
                    <h2>Warning</h2>
                    <p>
                        Do you really want to delete this item?
                        <br />
                        If so, please enter '{props.itemName}' in the field below.
                    </p>
                    <TextInput
                        placeholder={props.itemName}
                        className={styles.input}
                        onChange={setInput}
                        value={input}
                    />
                    <Button
                        className={styles.buttonDelete}
                        onClick={deleteConfirmed}
                        disabled={props.itemName !== input}>
                        Delete
                    </Button>
                </div>
            </div>
        </>
    )
}
