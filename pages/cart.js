/* eslint-disable react-hooks/rules-of-hooks */
import css from './Cart.module.css';
import Image from 'next/image';
import { useStore } from '../store/store';
import { urlFor } from '../lib/client';
import Layout from './../components/UI/Layout';
import toast, { Toaster } from 'react-hot-toast';
import OrderModal from '../components/OrderModal/OrderModal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const cart = () => {
  const CartData = useStore((state)=> state.cart);
  const removePizza = useStore((state)=> state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [order, setOrder] = useState();
  const [cart, setCart] = useState(CartData);
  const router = useRouter();

  useEffect(()=>{
    setOrder(localStorage.getItem('order')); 
  },[])

  const handleRemove = (i) => {
    removePizza(i);
    toast.error('Item Removed');
  }

  const total = () => CartData.pizzas.reduce((a,b) => a + b.quantity * b.price, 0)

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    localStorage.setItem('total', total());
  }

  const handleCheckout =async()=> {
    localStorage.setItem('total', total());
    setPaymentMethod(1);
    const response = await fetch(`/api/stripe`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(CartData.pizzas),
    });

    if(response.status === 500) return;

    const data = await response.json();
    toast.loading("Redirecting ...");
    router.push(data.url);
  }

  if(CartData.pizzas.length === 0){
    return (
      <Layout>
        <p>You don't have any product on your cart.</p>
      </Layout>
    )
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
          
            <tbody className={css.tbody}>
              {cart.pizzas.length > 0 && cart.pizzas.map((pizza,i) => {
                const src = urlFor(pizza.image).url();

                return(
                  <tr key={i}>
                    <td className={css.imageTd} >
                      <Image 
                        loader = {() => src} 
                        src={src}
                        alt=""
                        unoptimized
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
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span>{cart.pizzas.length}</span>
            </div>

            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>
              {order && cart.pizzas.length > 0
                ? (
                  <div className={css.buttons}>
                    <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
                    <button className="btn" onClick={handleCheckout}>Pay Now</button>
                  </div>
                )
                : null
              }
            

        </div>
      </div>
      <Toaster />

      <OrderModal
       opened = {paymentMethod === 0}
       setOpened = {setPaymentMethod}
       paymentMethod = {paymentMethod}
       />
    </Layout>
  )
}

export default cart