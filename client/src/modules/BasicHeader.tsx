import Head from 'next/head';

export default function BasicHeader(props: {
    title?: string
}) {
    const title = props.title || 'Zephy Back Office';
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
