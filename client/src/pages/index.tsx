import DisconnectedHomePage from '@/modules/homepage/DisconnectedHomePage';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Zephy - Back Office</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DisconnectedHomePage />
        </div>
    );
};

export default Home;
