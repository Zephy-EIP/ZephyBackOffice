import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import client from '@/utils/client';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Test() {
    const [file, setFile] = useState(null as File | null);
    const [ref, setRef] = useState(null as HTMLFormElement | null);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (file === null)
            return;
        const data = new FormData();
        data.append('sprintFile', file);

        client.post(
            '/sprint',
            data
        )
              .then(_e => ref?.reset())
              .catch(_e => {});
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null || e.target.files.length === 0) {
            setFile(null);
            return;
        }
        setFile(e.target.files[0]);
    }

    return (
        <>
            <BasicHeader title="Test - Zephy Back Office" />
            <Page>
                <form ref={setRef} style={{padding: 15}} onSubmit={onSubmit}>
                    <input type="file" name="sprintFile" onChange={onChange} />
                    <br /><br />
                    <input type="submit" />
                </form>
            </Page>
        </>
    );
}
