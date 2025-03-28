import Header from '../components/Header'
import {CheckCircleIcon} from '@heroicons/react/solid';
import {useRouter} from 'next/router';

function success() {
    const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
    <Header/>
    <main className="max-w-screen-lg mx-auto">
        <div className='flex flex-col p-10 bg-white'>
            <div className='flex items-center space-x-2 mb-5'>
                <CheckCircleIcon className="text-green-500 h-10"/>
                <h1 className='text-3xl'>Thank you, your order has been confirmed!</h1>
            </div>
            <p>
                Thank you for shopping with us. We'll send a confirmtion of your order once your order has been shipped.
                If you would like us to check the status of your order, please click on the link below.

            </p>
            <button onClick={()=> router.push("/orders")}  className='button  mt-8'>Go To My Orders</button>
        </div>

    </main>
    </div>
  )
}

export default success 