import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import SprintPart from '@/modules/pld/sprint-part/SprintPart';

export default function SprintParts() {

    return (
        <>
            <BasicHeader title="Sprint Parts - Zephy Back Office" />
            <Page>
                <div style={{padding: 15, paddingBottom: 250}}>
                    <SprintPart />
                </div>
            </Page>
        </>
    );
}
