import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import CreateMember from '@/modules/pld/member/CreateMember';
import DeleteMember from '@/modules/pld/member/DeleteMember';

export default function Members() {

    return (
        <>
            <BasicHeader title="Members - Zephy Back Office" />
            <Page>
                <div style={{padding: 15, paddingBottom: 250}}>
                    <CreateMember />
                    <DeleteMember />
                </div>
            </Page>
        </>
    );
}
