import TextInput from "@/components/inputs/TextInput";
import { useState } from "react";
import Button from '@/components/buttons/Button';
import styles from './ChangePassword.module.scss';

export default function ChangePassword() {
    const [inputError, setInputError] = useState([] as React.ReactNode[]);
    const [serverError, setServerError] = useState(<></>);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    return (
        <form onSubmit={e => {e.preventDefault()}}>
            <h2 className={styles.title}>Change your password</h2>
            <div className={`quicksand-medium ${styles.label}`}>Current password</div>
            <TextInput className={styles.input} placeholder="Password123" type="password" onChange={setNewPassword} />
            <div className={`quicksand-medium ${styles.label}`}>New password</div>
            <TextInput className={styles.input} placeholder="Password124" type="password" onChange={setOldPassword} />
            <div>
                {inputError}
                {serverError}
            </div>
            <Button className={styles.button} disabled={false}>Change password</Button>
        </form>
    );
}
