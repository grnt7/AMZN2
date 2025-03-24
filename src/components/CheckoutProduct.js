import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
//import primeLogo from "../../public/Prime_logo.png"; // Import the Prime logo
import { formatGBP } from "../utils/Currency"; // Adjust the path as needed
//import Currency1 from "../utils/Currency1"; // Assuming you have a Currency component
import Currency from "../utils/Currency1";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from '../slices/basketSlice';


function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
    quantity,
}) {
    console.log("CheckoutProduct - Price:", price, "Quantity:", quantity);

    const dispatch = useDispatch();
  
    const addItemToBasket = () => {
      const product = {
        id,
        title,
        price,
        description,
        category,
        image,
        quantity,
        hasPrime
      };
      // push item into redux
      dispatch(addToBasket(product));
    };

    const removeItemFromBasket = () => {
      //remove item from redux
      dispatch(removeFromBasket({ id }));
    }
    ///const totalPrice = price * quantity; // Calculate total price
    ///const formattedPrice =formatGBP(totalPrice); // Format the total price
    const formattedPrice = formatGBP(price);

   
  return (
    <div className="grid grid-cols-5">
        <Image src={image}
        style={{ objectFit: 'contain' }}
  width={200}
  height={200} />
  {/*Middle section*/ }
  <div className="col-span-3 mx-5">
    <p>{title}</p>
    <div className="flex">
      {Array(rating)
      .fill()
      .map((_, i)=> (
        <StarIcon key={i} className="h-5 text-yellow-500"/>
      ))
       

      
      }
    </div>
    <p className="text-xs mt-2 my-2 line-clamp-3">{description}</p>
    <p>{formattedPrice}</p> {/* Render the result calculates the total in GBP*/}
   
    {hasPrime && (
      <div className="flex items-center space-x-2 ">
        <img className="w-12"
                            loading="lazy"
                            src="/Prime_logo.png" // Corrected path
                            alt="Prime Logo" width={100} height={50}
         />
        <p className="text-xs text-grey-500">FREE Next-day Delivery</p>
      </div>
    )}
  </div>
  {/*Right add and remove buttons*/ }
  <div className="flex flex-col space-y-2 my-auto justify-self-end">
    <button className="button mt-auto" onClick={addItemToBasket}>Add to Basket</button>
    <button className="button mt-auto" onClick={removeItemFromBasket}>Remove from Basket</button>
    
    {/* Add a "Continue Shopping" button here */}
    {/* Add a "Checkout with Amazon Pay" button here */}
    {/* Add a "Save for later" button here */}
    {/* Add a "Return or exchange" button here */}
    {/* Add a "Track your order" button here */}
    {/* Add a "Share this product" button here */}
    {/* Add a "Write a review" button here */}
    {/* Add a "Write a testimonial" button here */}
    {/* Add a "Write a customer review" button here */}
    {/* Add a "Write a question" button here */}
  </div>
    </div>
  )
}

export default CheckoutProduct


/*
 <p>Quantity: {quantity}</p>

 <p className="text-xs mt-2">Subtotal: {formattedPrice}</p>
    <button className="button mt-auto">Proceed to Checkout</button>
*/