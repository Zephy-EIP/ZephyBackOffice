import { Changelog } from '@/entities/Changelog';
import Footer from '@/modules/pld/pdf/Footer';
import PLDChangelog from '@/modules/pld/pdf/PLDChangelog';
import PLDDescription from '@/modules/pld/pdf/PLDDescription';
import PLDHomepage from '@/modules/pld/pdf/PLDHomepage';
import PLDSummary from '@/modules/pld/pdf/PLDSummary';
import { Document, Page } from '@react-pdf/renderer';

export default function PLD(props: {
    changelog: Changelog[]
}) {
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
            <Page>
                <PLDDescription changelog={props.changelog} />
                <Footer />
            </Page>
            <Page>
                <PLDChangelog changelog={props.changelog} />
                <Footer />
            </Page>
        </Document>
    );
}
