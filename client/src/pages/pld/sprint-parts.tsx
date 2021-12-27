import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import CreateSprintPart from '@/modules/pld/sprint-part/CreateSprintPart';
import UpdateSprintPart from '@/modules/pld/sprint-part/UpdateSprintPart';

export default function SprintParts() {

    return (
        <>
            <BasicHeader title="Sprint Parts - Zephy Back Office" />
            <Page>
                <div style={{padding: 15, paddingBottom: 250}}>
                    <CreateSprintPart />
                    <UpdateSprintPart />
                </div>
            </Page>
        </>
    );
}
