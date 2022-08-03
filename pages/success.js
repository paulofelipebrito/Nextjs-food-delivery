import OrderModal from "../components/OrderModal/OrderModal";
import Layout from "../components/UI/Layout";

export default function Success(){
  return (
    <Layout>
      <OrderModal opened={true} paymentMethod={1} />
    </Layout>
  )
}