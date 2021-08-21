import Image from 'next/image'
import LogoWhite from '../assets/images/logo-white.png'

const ElipseLogo = () => {
  return (
    <>
      <div className={'elipse-logo-wrapper'}>
      </div>
      <div className={'elipse-img-wrapper'}>
        <Image src={LogoWhite} alt="Elipse logo" layout={'fill'} />
      </div>
    </>
  )
}

export default ElipseLogo