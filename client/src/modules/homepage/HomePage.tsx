import Box from "@/components/shapes/Box";
import PageHeader from "@/components/templates/PageHeader";
import BasicHeader from "@/modules/BasicHeader";
import styles from './HomePage.module.scss';

export default function HomePage() {

    return (
        <>
            <BasicHeader />
            <main>
                <PageHeader />
            </main>
        </>
    );
}
