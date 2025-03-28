import moment from "moment";
import { formatGBP } from '../utils/Currency'; // Import the function

function order({ id, amount, amountShipping, items, timestamp, images = [] }) { // Added default value
    return (
        <div className="relative border rounded-md">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <p className="font-bold text-xs">ORDER PLACED</p>
                <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>

                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                        {formatGBP(amount + amountShipping)}-Next Day Delivery{""}
                    </p>
                </div>
                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    {/*{items.length} item*/} items
                </p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs"></p>
            </div>
            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {images && Array.isArray(images) && images.map(image => ( // Added conditional check
                        <img src={image} alt="" className="h-20 object-contain sm:h-32" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default order;