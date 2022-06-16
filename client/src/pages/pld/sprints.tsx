import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import SprintCreate from '@/modules/pld/sprint/SprintCreate';
import SprintUpdate from '@/modules/pld/sprint/SprintUpdate';

export default function Sprints() {

    return (
        <>
            <BasicHeader title="Sprints - Zephy Back Office" />
            <Page>
                <div style={{padding: 15, paddingBottom: 250}}>
                    <SprintCreate />
                    <SprintUpdate />
                </div>
            </Page>
        </>
    );
}
