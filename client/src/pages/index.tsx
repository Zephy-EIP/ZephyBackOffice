import Button from '@/components/buttons/Button';
import BasicHeader from '@/modules/BasicHeader';
import DisconnectedHomePage from '@/modules/homepage/DisconnectedHomePage';
import HomePage from '@/modules/homepage/HomePage';
import { getToken } from '@/utils/token';
import { useEffect, useState } from 'react';

const Home = () => {
    const [connected, setConnected] = useState(undefined as undefined | boolean);
    useEffect(()=> {
        setConnected(getToken() !== null);
    }, []);

    if (connected === undefined)
        return <></>; // TODO: loading

    if (connected === false)
        return (
            <>
                <DisconnectedHomePage />
            </>
        );
    return (
        <>
            <HomePage />
        </>
    );
};

export default Home;
