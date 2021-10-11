import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import CreateMember from '@/modules/pld/member/CreateMember';
import DeleteMember from '@/modules/pld/member/DeleteMember';
import CreateSprintPart from '@/modules/pld/sprint-part/CreateSprintPart';
import SprintCreate from '@/modules/pld/sprint/SprintCreate';
import SprintDelete from '@/modules/pld/sprint/SprintDelete';
import SprintUpdateData from '@/modules/pld/sprint/SprintUpdateData';
import SprintUpdateName from '@/modules/pld/sprint/SprintUpdateName';

export default function Test() {

    return (
        <>
            <BasicHeader title="Test - Zephy Back Office" />
            <Page>
                <div style={{padding: 15, paddingBottom: 250}}>
                    <SprintCreate />
                    <SprintUpdateData />
                    <SprintUpdateName />
                    <SprintDelete />
                    <CreateMember />
                    <DeleteMember />
                    <CreateSprintPart />
                </div>
            </Page>
        </>
    );
}
