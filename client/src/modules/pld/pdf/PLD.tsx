import Footer from '@/modules/pld/pdf/Footer';
import PLDHomepage from '@/modules/pld/pdf/PLDHomepage';
import PLDSummary from '@/modules/pld/pdf/PLDSummary';
import { Document, Page, View } from '@react-pdf/renderer';

export default function PLD() {
    return (
        <Document title="PLD Zephy">
            <Page size="A4">
                <PLDHomepage />
                <Footer />
            </Page>
            <Page>
                <PLDSummary />
                <Footer />
            </Page>
        </Document>
    );
}
