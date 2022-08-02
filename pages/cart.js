/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import Image from 'next/image';
import { useStore } from '../store/store';
import { urlFor } from '../lib/client';
import Layout from './../components/UI/Layout';
import toast, { Toaster } from 'react-hot-toast';

const cart = () => {
  const CartData = useStore((state)=> state.cart);
  const removePizza = useStore((state)=> state.removePizza);
  const [paymentMethod, setPaymentMethod] = useStore(null);

  const handleRemove = (i) => {
    removePizza(i);
    toast.error('Item Removed');
  }

  const total = () => CartData.pizzas.reduce((a,b) => a + b.quantity * b.price, 0)

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== 'undefined' && localStorage.setItem('total', total());
  }

  return (
    <Layout>
      <div className={css.container}>
        {/* Details */}
        <div className={css.details}>
          <table className={css.table}>
            <th>Pizza</th>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          
            <tbody className={css.tbody}>
              {CartData.pizzas.length > 0 && CartData.pizzas.map((pizza,i) => {
                const src = urlFor(pizza.image).url();

                return(
                  <tr key={i}>
                    <td className={css.imageTd} >
                      <Image 
                        loader = {() => src} 
                        src={src}
                        alt=""
                        objectFit = "cover"
                        width = {85}
                        height = {85}
                        />
                    </td>
                    <td>
                      {pizza.name}
                    </td>
                    <td>
                      {
                        pizza.size === 0 ? 
                        "Small" : 
                        pizza.size === 1 ?
                        "Medium" : 
                        "Large"
                      }
                    </td>
                    <td>
                      {pizza.price}
                    </td>
                    <td>
                      {pizza.quantity}
                    </td>
                    <td>
                      {pizza.price * pizza.quantity}
                    </td>
                    <td style={{
                      color: "var(--themeRed",
                      cursor: "pointer"
                    }}
                    onClick={()=> handleRemove(i)}
                    >x</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* summary */}
        <div className={css.start}>
          <span>Cart</span>
          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span>{CartData.pizzas.length}</span>
            </div>

            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>

            <div className={css.buttons}>
              <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
              <button className="btn">Pay Now</button>
            </div>

        </div>
      </div>
      <Toaster />

      <OrderModal
       opened = {paymentMethod === 0}
       />
    </Layout>
  )
}

export default cart