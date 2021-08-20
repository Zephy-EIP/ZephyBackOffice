import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import LogoWhite from '../assets/images/logo-white.png';
import Logo from '../assets/images/logo.png';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zephy - Back Office</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="home-content">
        <div className="content">
          <div className={'c c-1'}>
            <div className="logo-uptitle">
              <Image src={Logo} alt="Logo du site" />
              <h3>Zephy</h3>
            </div>
            <div className="title">
              <h1 className="black">Bienvenue sur le<br/>Back Office de <span className="purple">Zephy</span></h1>
            </div>
            <div className="description">
              <p className="justify black">
                Zephy centralise les données des différents transports afin de vous fournir rapidement des trajets optimisés et alternatifs. Avec quelques étapes, simplement et du bout des doigts, personnalisez votre trajet.
              </p>
            </div>
          </div>
          <div className={'c c-2'}>
            <div className={'elipse-logo-wrapper'}>
            </div>
            <div className={'img-wrapper'}>
              <Image src={LogoWhite} alt="Elipse logo" layout={'fill'} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
