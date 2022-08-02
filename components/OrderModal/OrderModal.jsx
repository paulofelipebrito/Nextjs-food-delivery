import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { createOrder } from '../../lib/orderHandler';
import { useStore } from '../../store/store';
import toast, {Toaster} from 'react-hot-toast';
import css from './OrderModal.module.css';

const OrderModal = ({opened, setOpened, paymentMethod}) => {
  const theme = useMantineTheme();
  const [formData, setFormData] = useState({});

  const handleInput = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value});
  }

  const resetCart = useStore((state)=> state.resetCart)

  const total = typeof window !== 'undefined' && localStorage.getItem('total');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({...formData, total, paymentMethod})
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== 'undefined' && localStorage.setItem('order', id);
    }
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened = {opened}
      onClose = {()=> setOpened(null)}
      >
        {/* Modal content */}
        <form action="" className={css.formContainer} onSubmit={handleSubmit}>
          <input onChange={handleInput} type="text" name='name' required placeholder="Name"/>
          <input onChange={handleInput} type="text" name='phone' required placeholder="Phone Number"/>
          <textarea onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>

          <span>
            You will pay <span>$ {total}</span> on delivery
          </span>

          <button type="submit" className="btn">Place Order</button>
        </form>
        <Toaster />
    </Modal>
  )
}

export default OrderModal