import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import SprintUpdateData from '@/modules/pld/SprintUpdateData';
import client from '@/utils/client';
import { ChangeEvent, FormEvent, useState } from 'react';

function UploadForm() {
    const [file, setFile] = useState(null as File | null);
    const [ref, setRef] = useState(null as HTMLFormElement | null);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (file === null)
            return;
        const data = new FormData();
        data.append('sprintFile', file);
        data.append('sprint_name', 'Test & Learn');

        client.post(
            '/sprint',
            data,
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
        <form ref={setRef} onSubmit={onSubmit}>
            <h2>Create Sprint</h2>
            <input type="file" name="sprintFile" onChange={onChange} />
            <br /><br />
            <input type="submit" />
        </form>
    );
}

export default function Test() {

    return (
        <>
            <BasicHeader title="Test - Zephy Back Office" />
            <Page>
                <div style={{padding: 15}}>
                    <UploadForm />
                    <SprintUpdateData />
                </div>
            </Page>
        </>
    );
}
