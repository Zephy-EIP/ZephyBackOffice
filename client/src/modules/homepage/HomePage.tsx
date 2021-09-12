import Page from "@/components/templates/Page";
import BasicHeader from "@/modules/BasicHeader";
import styles from './HomePage.module.scss';

export default function HomePage() {
    return (
        <>
            <BasicHeader />
            <main>
                <Page>
                    <div className={styles.content}>
                        <h1>
                            Move along
                        </h1>
                        <p>
                            There's nothing to see here.
                        </p>
                    </div>
                </Page>
            </main>
        </>
    );
}
