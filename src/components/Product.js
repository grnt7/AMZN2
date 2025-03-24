import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { formatGBP } from '../utils/Currency'; // Import the function
import primeLogo from "../../public/Prime_logo.png"; // Import the Prime logo
import { useDispatch } from "react-redux";
import { addToBasket } from '../slices/basketSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    const dispatch = useDispatch();
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );

    const [hasPrime] = useState(Math.random() < 0.5);

    // Format the price here:
    const formattedPrice = formatGBP(price);

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
            quantity: 1, //Critical to send product to the basket slice.
        };
        //sending product as an action to REDUX store...the basket slice
        dispatch(addToBasket(product));
    }

    return (
        <div className="relative flex flex-col  m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-xs italic text-grey-400 my-3">{category}</p>

            <Image src={image} height={200} width={200} objectFit="contain" alt="product image" />
            <h4>{title}</h4>
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon className="h-5 text-yellow-500" key={i} />
                    ))}
            </div>
            <p className="text-xs mt-2 my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <p>{formattedPrice}</p> {/* Render the result */}
            </div>
            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5 mb-1">
                      <Image className="w-12" src={primeLogo} alt="Prime Logo" width={100} height={50} />
                    <p className="text-xs text-grey-500">FREE Next-day Delivery</p>
                </div>
            )}
            <button onClick={addItemToBasket}  className="button mt-auto">Add to Basket</button>
        </div>
    );
}

export default Product;