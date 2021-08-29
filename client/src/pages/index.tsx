import BasicHeader from '@/modules/BasicHeader';
import DisconnectedHomePage from '@/modules/homepage/DisconnectedHomePage';
import { getToken } from '@/utils/token';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <>
            <BasicHeader />
            <DisconnectedHomePage />
        </>
    );
};

export default Home;
