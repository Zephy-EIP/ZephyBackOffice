import styles from './CreateAccount.module.scss';
import { RootState, useThunkDispatch } from '@/utils/store';
import { connect, ConnectedProps } from 'react-redux';
import TextInput from '@/components/inputs/TextInput';
import Button from '@/components/buttons/Button';
import { useEffect, useRef, useState } from 'react';
import { emailIsValid, passwordIsValid, usernameIsValid } from '@/utils/utils';
import { createAccount } from '@/modules/administration/createAccount/createAccountReducer';
import Tooltip from '@/components/tooltips/Tooltip';
import { getRoles } from '@/modules/roleReducer';
import Select, { SelectElement } from '@/components/selectors/Select';
import copyIcon from '@/assets/images/icons/copy.svg';
import Image from 'next/image';
import PermanentTooltip from '@/components/tooltips/PermanentTooltip';

const mapStateToProps = (state: RootState) => {
    return {
        createAccount: state.createAccount,
        roleList: state.role.roleList,
    };
}

const connector = connect(mapStateToProps, { createAccountFct: createAccount, getRoles });

function getRandomPassword(): string {
    let password = '';
    while (!passwordIsValid(password)) {
        const num = Math.random() * (127 - 33); // 127 => max + 1, 33 => min char
        password += String.fromCharCode(num + 33); // 33 => min char, num => between 0 and 127 - 33
    }
    return password;
}

function CreateAccount(props: ConnectedProps<typeof connector>) {
    const [password, setPassword] = useState(getRandomPassword());
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState(null as null | number);
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState([] as React.ReactNode[]);
    const [copiedTooltip, setCopiedTooltip] = useState(false);
    const dispatch = useThunkDispatch();
    const textRef = useRef(null);

    const copyToClipboard = () => {
        textRef.current!.select();
        document.execCommand('copy');
        setCopiedTooltip(true);
        setTimeout(() => {
            setCopiedTooltip(false);
        }, 2000);
    }

    const resetFields = () => {
        setEmail('');
        setUsername('');
        setRoleId(null);
        setPassword(getRandomPassword());
    }

    const createAccountFct = () => {
        const err = [];
        if (!usernameIsValid(username))
            err.push(<div key="username">Invalid username</div>)
        if (!emailIsValid(email))
            err.push(<div key="username">Invalid email</div>)
        setErrors(err);
        if (err.length > 0)
            return;
    };

    useEffect(() => { (async () => { dispatch(await props.getRoles()) })(); }, []);

    let roles = props.roleList.roles?.map(role => {
        return new SelectElement(role.display_name, role.id.toString());
    }) || [];

    return (
        <section id="create-account">
            <form onSubmit={e => e.preventDefault()}>
                <h2 className={styles.title}>Create Account</h2>
                <label className="quicksand-medium">Username</label>
                <TextInput
                    className={styles.input}
                    value={username}
                    placeholder="Username 123"
                    autoComplete="off"
                    onChange={setUsername} />
                <label className="quicksand-medium">Email</label>
                <TextInput
                    className={styles.input}
                    value={email}
                    placeholder="truc@machin.com"
                    autoComplete="off"
                    onChange={setEmail} />
                <label className="quicksand-medium">Password</label>
                <Tooltip
                    className={styles.tooltip}
                    position="right"
                    text="Don't worry about the password, it's generated autmatically">
                    <TextInput
                        className={styles.input}
                        value={password}
                        placeholder="Password!23"
                        type="password"
                        autoComplete="off"
                        disabled={true} />
                </Tooltip>

                <label className="quicksand-medium">Role</label>
                <div className={styles.select}>
                    <Select
                        elements={[new SelectElement('No role', 'null')].concat(roles)}
                        defaultKey="null"
                        defaultTitle="No role"
                        onChange={(value) => {
                            if (value === 'null')
                                setRoleId(null);
                            else
                                setRoleId(parseInt(value));
                        }} />
                </div>
                <div className={styles.error}>
                    {errors}
                </div>
                <div className={styles.buttonWrapper}>
                    <Button loading={props.createAccount.loading} onClick={createAccountFct} className={styles.button}>
                        Create Account
                    </Button>
                    <PermanentTooltip enabled={copiedTooltip} className={styles.tooltipCopied} position="right" text="Copied!">
                        <Tooltip enabled={props.createAccount.loaded === true} className={styles.tooltip} position="right" text="You will be able to copy the information after the account's creation">
                            <Button onClick={copyToClipboard} className={styles.copyButton} disabled={props.createAccount.success === true}>
                                <Image src={copyIcon} width="16pt" height="16pt" className={styles.copyIcon} />
                            </Button>
                        </Tooltip>
                    </PermanentTooltip>
                </div>
            </form>
            <textarea
                style={{position: 'fixed', opacity: 0, maxHeight: 0, maxWidth: 0, top: -100, left: -100}}
                value={`${email}\n${password}`}
                onChange={()=>{}}
                ref={textRef}>
            </textarea>
        </section>
    );
}

export default connector(CreateAccount);
