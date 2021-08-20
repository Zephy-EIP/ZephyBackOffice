import React from 'react';
import Link from 'next/link';

interface Props {
    href: string;
    text: string;
}

const MainButton = (props: Props) => {
  return (
    <div className={'main-button'}>
        <Link href={props.href}>
          <a className={'white quicksand-medium'}>{props.text}</a>
        </Link>
    </div>
  )
}

export default MainButton