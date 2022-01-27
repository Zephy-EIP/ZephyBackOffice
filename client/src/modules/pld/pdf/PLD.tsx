import { Changelog } from '@/entities/Changelog';
import Sprint from '@/entities/Sprint';
import SprintPart from '@/entities/SprintPart';
import { SprintPartReport } from '@/entities/SprintPartReport';
import Footer from '@/modules/pld/pdf/Footer';
import PLDChangelog from '@/modules/pld/pdf/PLDChangelog';
import PLDDeliverables from '@/modules/pld/pdf/PLDDeliverables';
import PLDDescription from '@/modules/pld/pdf/PLDDescription';
import PLDHomepage from '@/modules/pld/pdf/PLDHomepage';
import PLDReports from '@/modules/pld/pdf/PLDReports';
import PLDSprints from '@/modules/pld/pdf/PLDSprints';
import PLDSummary from '@/modules/pld/pdf/PLDSummary';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import BetaPlan from './BetaPlan';

const styles = StyleSheet.create({
    body: {
        paddingTop: 30,
        paddingBottom: 50,
        paddingHorizontal: 50,
    }
});

export default function PLD(props: {
    changelog: Changelog[],
    sprints: Sprint[],
    sprList: SprintPartReport[],
    sprintPartList: SprintPart[],
}) {
    return (
        <Document title="PLD Zephy" author="Equipe Zephy">
            <Page size="A4">
                <PLDHomepage />
                <Footer />
            </Page>
            <Page>
                <PLDSummary />
                <Footer />
            </Page>
            <Page style={styles.body}>
                <PLDDescription changelog={props.changelog} />
                <Footer />
            </Page>
            <Page style={styles.body}>
                <PLDChangelog changelog={props.changelog} />
                <Footer />
            </Page>
            <Page style={styles.body}>
                <PLDDeliverables />
                <Footer />
            </Page>
            <Page style={styles.body}>
                <PLDSprints sprints={props.sprints} />
                <Footer />
            </Page>
            <Page style={styles.body}>
                <BetaPlan />
                <Footer />
            </Page>
            <Page style={styles.body}>
                <PLDReports
                    sprints={props.sprints}
                    sprList={props.sprList}
                    sprintPartList={props.sprintPartList} />
                <Footer />
            </Page>
        </Document>
    );
}
