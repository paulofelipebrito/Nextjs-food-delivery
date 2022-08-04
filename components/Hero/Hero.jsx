import css from './Hero.module.css';
import Image from 'next/image'
import Cherry from '../../assets/Cherry.png'
import HeroImage from '../../assets/HeroImage.png'
import {UilPhone} from '@iconscout/react-unicons'
import Pizza1 from '../../assets/p1.jpg';

const Hero = () => {
  return (
    <div className={css.container}>
      {/* Left side */}
      <div className={css.left}>
        <div className={css.cherryDiv}>
          <span>More than Faster</span>
          <Image src={Cherry} alt="" width={40} height={25}/>
        </div>
      
        <div className={css.heroText}>
          <span>Be The Fastest</span>
          <span>In Delivering</span>
          <span>
            Your <span style={{color: "var(--themeRed)"}}>Pizza</span>
          </span>
        </div>

        <div className={css.miniText}>
          Our mission is to filling your tummy with delicious food and with fast and free delivery
        </div>

        <button className={`btn ${css.btn}`}>Get Started</button>
      </div>

      {/* Right side */}
      <div className={css.right}>
        <div className={css.imageContainer}>
          <Image src={HeroImage} alt="hero" layout="intrinsic" />
        </div>

        <div className={css.contactUs}>
          <span>Contact Us</span>
          <div>
            <UilPhone color='white' />
          </div>
        </div>

        <div className={css.pizza}>
          <div>
            <Image src={Pizza1} alt="Pizza" objectFit="cover" layout="intrinsic"/>
          </div>

          <div className={css.details}>
            <span>Italian Pizza</span>
            <span><span style={{color: 'var(--themeRed'}}>$</span> 7.49</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero