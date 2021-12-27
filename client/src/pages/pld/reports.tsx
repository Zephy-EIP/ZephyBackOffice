import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import SprintPartReportForm from '@/modules/pld/sprint-part-report/SprintPartReportForm';

export default function Reports() {

    return (
        <>
            <BasicHeader title="Reports - Zephy Back Office" />
            <Page>
                <div style={{padding: 15, paddingBottom: 250}}>
                    <SprintPartReportForm />
                </div>
            </Page>
        </>
    );
}
