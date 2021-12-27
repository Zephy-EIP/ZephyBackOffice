import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import SprintCreate from '@/modules/pld/sprint/SprintCreate';
import SprintDelete from '@/modules/pld/sprint/SprintDelete';
import SprintUpdateData from '@/modules/pld/sprint/SprintUpdateData';
import SprintUpdateName from '@/modules/pld/sprint/SprintUpdateName';

export default function Sprints() {

    return (
        <>
            <BasicHeader title="Sprints - Zephy Back Office" />
            <Page>
                <div style={{padding: 15, paddingBottom: 250}}>
                    <SprintCreate />
                    <SprintUpdateData />
                    <SprintUpdateName />
                    <SprintDelete />
                </div>
            </Page>
        </>
    );
}
