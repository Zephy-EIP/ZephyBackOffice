import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import CreateChangelog from '@/modules/pld/changelog/CreateChangelog';
import UpdateChangelog from '@/modules/pld/changelog/UpdateChangelog';

export default function Changelogs() {

    return (
        <>
            <BasicHeader title="Changelogs - Zephy Back Office" />
            <Page>
                <div style={{padding: 15, paddingBottom: 250}}>
                    <CreateChangelog />
                    <UpdateChangelog />
                </div>
            </Page>
        </>
    );
}
