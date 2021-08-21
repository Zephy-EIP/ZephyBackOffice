import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import LogoWhite from '../../assets/images/logo-white.png';
import Logo from '../../assets/images/logo.png';
import ElipseLogo from '../../shared/ElipseLogo';
import MainButton from '../../shared/MainButton';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zephy - Back Office</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="login-content">
        <div className="content">
          <div className={'c c-1'}>
            <div className="logo-uptitle">
              <Image src={Logo} alt="Logo du site" />
              <h3>Zephy</h3>
            </div>
          </div>
          <div className={'c c-2'}>
            <ElipseLogo />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
