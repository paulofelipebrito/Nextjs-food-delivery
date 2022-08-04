import css from './Header.module.css';
import Image from 'next/image';
import Logo from '../../assets/Logo.png';
import { UilShoppingBag } from '@iconscout/react-unicons';
import { useStore } from '../../store/store'
import Link from 'next/link';

const Header = () => {
  const items = useStore((state) => state.cart.pizzas.length);

  return (
    <div className={css.header}>
      
      {/* Logo */}
      <div className={css.logo}>
        <Image src={Logo} alt="" width={50} height={50} />
      </div>

      {/* Menu */}
      <ul className={css.menu}>
        <li><Link href={"/"}>Home</Link></li>
        <li><Link href={"/#menu"}>Menu</Link></li>
        <li><Link href={"#contact"}>Contact</Link></li>
      </ul>

      {/* Right side */}
      <div className={css.rightSide}>
        <Link href='/cart'>
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2E2E2E"/>
            <div className={css.badge}>{items}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header