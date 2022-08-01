import css from './styles/Hero.module.css';
import Image from 'next/image'
import Cherry from '../../assets/Cherry.png'
import React from 'react'

const Hero = () => {
  return (
    <div className={css.container}>
      {/* Left side */}
      <div className={css.cherryDiv}>
        <span>More than Faster</span>
        <Image src={Cherry} alt="" width={40} height={25}/>
      </div>
      {/* Right side */}
    </div>
  )
}

export default Hero