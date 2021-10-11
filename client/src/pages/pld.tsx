import Page from '@/components/templates/Page';
import BasicHeader from '@/modules/BasicHeader';
import PLD from '@/modules/pld/pdf/PLD';
import { PDFViewer } from '@react-pdf/renderer';

export default function PLDPage() {
    return (
        <>
            <BasicHeader title="Test - Zephy Back Office" />
            <Page>
                <PDFViewer style={{width: '100%', height: '100%'}}>
                    <PLD />
                </PDFViewer>
            </Page>
        </>
    )
}
