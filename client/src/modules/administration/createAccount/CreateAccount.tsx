import styles from './CreateAccount.module.scss';
import { RootState, useThunkDispatch } from '@/utils/store';
import { connect, ConnectedProps } from 'react-redux';
import TextInput from '@/components/inputs/TextInput';
import Button from '@/components/buttons/Button';
import { useEffect, useRef, useState } from 'react';
import { passwordIsValid } from '@/utils/utils';
import { createAccount } from '@/modules/administration/createAccount/createAccountReducer';
import Tooltip from '@/components/tooltips/Tooltip';
import { getRoles } from '@/modules/roleReducer';
import Select, { SelectElement } from '@/components/selectors/Select';

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
    const [roleId, setRoleId] = useState(-1);
    const [username, setUsername] = useState('');
    const dispatch = useThunkDispatch();
    const textRef = useRef(null);

    const copyToClipboard = () => {
        textRef.current!.select();
        document.execCommand('copy');
    }

    const resetFields = () => {
        setEmail('');
        setUsername('');
        setRoleId(-1);
        setPassword(getRandomPassword());
    }

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
                <Tooltip position="right" text="Will be copied on account creation">
                    <TextInput
                        className={styles.input}
                        value={password}
                        placeholder="Password!23"
                        type="password"
                        autoComplete="off"
                        disabled={true} />
                </Tooltip>

                <div className={styles.select}>
                    <Select
                        elements={[new SelectElement('No role', 'null')].concat(roles)}
                        defaultKey="null"
                        defaultValue="No role"
                        onChange={(value) => {
                            setRoleId(parseInt(value));
                        }} />
                </div>
                <Button onClick={copyToClipboard} className={styles.button}>
                    Create Account
                </Button>
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
