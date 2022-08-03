import Stripe from 'stripe';

const stripe = Stripe(process.env.REACT_APP_STRIPE_KEY);

export default async function handler(req,res,next) {
  if(req.method === 'POST'){
    try{  
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: req.body.map((item)=> {
          const img = item.image.asset._ref;

          const newImage = img.replace(
            'image-',
            'https://cdn.sanity.io/images/2jlnl6ho/production/'
          ).replace('-jpg', '.jpg');

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price*100 
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`
      }

      // checkout session
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    }
    catch(err){
      res.status(500).json({message: err.message})
    }
  } else{
    res.setHeader('Allow', 'POST');
    res.status(405).end('method not allowed');
  }
}