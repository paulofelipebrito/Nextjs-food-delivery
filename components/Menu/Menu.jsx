import Image from 'next/image'
import { urlFor } from '../../lib/client'
import css from './Menu.module.css'
import Link from 'next/link'

const Menu = ({pizzas}) => {
  return (
    <div className={css.container} id="menu">
      <div className={css.heading}>
        <span>OUR MENU</span>
        <span>Menu That Always</span>
        <span>Make you Fall in Love</span>
      </div>

      {/* pizzas */}
      <div className={css.menu}>
        {pizzas.map((pizza,id) => {
          const src = urlFor(pizza.image).url()
          return (
            <div className={css.pizza} key={id}>
              <Link href={`./pizza/${pizza.slug.current}`}>
                <div className={css.imageWrapper}>
                  <Image loader = {() => src} src={src} alt={pizza.name} objectFit="cover" layout="fill" unoptimized/>
                </div>
              </Link>

              <span>{pizza.name}</span>
              <span><span style={{color: 'var(--themeRed)'}}>$</span> {pizza.price[1]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Menu