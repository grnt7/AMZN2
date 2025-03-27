import Header from "../components/Header"
import Image from "next/image"
import { useSelector } from'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { formatGBP } from '../utils/Currency'; // Import the function
import { useSession } from "next-auth/react";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key); // Replace with your actual Stripe publishable key


function checkout() {
  const items = useSelector(selectItems); // Get the items from the Redux store
  const total = useSelector(selectTotal)
  const {data: session, status} = useSession(); // Get session data
  
  const createCheckoutSession = async () => {
      const stripe = await stripePromise; // Get stripe

      // call the backend API to create a checkout session...
      const checkoutSession = await axios.post('/api/create-checkout-session',  
        {
        
        items: items,
        email: session.user.email
      });
      // Redirect to the stripe Checkout page with the session ID
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id
      })
      if (result.error) {alert(result.error.message);

      };
        
      
  };

 
    // Calculate the total price
    const totalPrice = items.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);

      if (isNaN(price) || isNaN(quantity)) {
          console.error("Invalid price or quantity for item:", item);
          return total;
      }

      return total + price * quantity;
  }, 0);

  // Format the total price by calling the function
  const formattedTotalPrice = formatGBP(totalPrice); // Corrected line
  
  return (
    <div className="bg-gray-100"> 
       
    <Header/>
    <main className="lg:flex max-w-screen-2xl mx-auto">
        {/*left*/}
        <div className="flex-grow m-5 shadow-sm">
            <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            />
        

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {
                items.length === 0? 'Your Amazon Basket is Empty' : 
                "Your Shopping Basket"
              }
              </h1>
              {items.map((item, i) => (
                
                <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={items.price}
                description={item.description}
                category={item.category}
                image={item.image}
                rating={item.rating} //add to see ratings in checkout shopping basket
                quantity={item.quantity} // Add this line
                hasPrime={item.hasPrime} // Add}
                  
                
                
                
                />
               
              ))}

             </div>
          </div>
          {/*Right*/}
          <div className="flex flex-col bg-white p-10 shadow-md">
            {items.length > 0 && (
              <>
              <h2 className="whitespace-nowrap">Subtotal({items.length} items):{" "}
              <span className="font-bold">
               
              {formattedTotalPrice} {/*  // Display the formatted total */}
              </span>
              </h2>
              <button
                        role="link" //seo best pratice
                        onClick={createCheckoutSession}
                        disabled={status !== "authenticated"} // Check status
                        className={`button mt-2 ${status !== "authenticated" &&
                            "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                            }`}
                    >
                        {status === "loading"
                            ? "Checking session..."
                            : status === "unauthenticated"
                                ? "Sign in to checkout"
                                : "Proceed to Checkout"}
                    </button>
              </>
            )}
          </div>
    </main>
    </div>
  )
}

export default checkout


/*
  added - const items = useSelector(selectItems);
    const { session } = useSession();

    // Calculate the total price
    const totalPrice = items.reduce((total, item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);

        if (isNaN(price) || isNaN(quantity)) {
            console.error("Invalid price or quantity for item:", item);
            return total;
        }

        return total + price * quantity;
    }, 0);

    // Format the total price by calling the function
   to here- const formattedTotalPrice = formatGBP(totalPrice); // Corrected line

    return (
        <div className="bg-gray-100">
            {/* ... (rest of your component) }
            <div className="flex flex-col bg-white p-10 shadow-md">
                {items.length > 0 && (
                    <>
                        <h2 className="whitespace-nowrap">Subtotal({items.length} items):
                            <span className="font-bold">
                                {formattedTotalPrice} {/* Display the formatted total }
                            </span>
                        </h2>

*/