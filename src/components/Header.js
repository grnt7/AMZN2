import Image from 'next/image';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { useState, useRef, useEffect } from 'react';
import {signIn, signOut, useSession}from 'next-auth/react';
import {useRouter} from "next/router";
import { useSelector } from'react-redux';
import { selectItems } from '../slices/basketSlice';

function Header() {
  const { data: session } = useSession(); // Get session data
  const router = useRouter();
  const items = useSelector(selectItems);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <header>
      
        {/*Top nav */}
        <div className='flex items-center  bg-amazon_blue p-1 flex-grow py-2
        '>
            <div className='mt-2 mr-6 ml-6 flex items-center flex-grow sm:flex-grow-0 cursor-pointer'>
            <Image
            
            onClick={()=>router.push('/')}
            src= "https://links.papareact.com/f90"
            width={150}
            height={40}
            style={{ objectFit: 'contain' }}
            className="cursor pointer"
            /> 
            
            </div>
           
            <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
      {/* Grey Box with Dropdown */}
      <div className="relative bg-gray-200 rounded-l-md p-2 mr-2" ref={dropdownRef}>
        <button className="flex items-center space-x-1" onClick={toggleDropdown}>
          <span>All Departments</span>
          <div className = "pr-1">
          <svg
            className="h-4 w-4 z-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >

            <path d="M9.293 12.95l.707 0.707L15.657 10l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
          </div>
        </button>
        {/* Dropdown Content*/ }
        <div
          className={`absolute bg-white rounded-md shadow-lg py-1 mt-2 w-48 z-50 ${
            isDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            All Departments
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Alexa Skills
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Amazon Devices
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Amazon Fresh
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Amazon Global Store
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Amazon Resale
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Amazon Apps & Games
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Audible Audiobooks
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Baby
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
           Beauty
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Books
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Car & Motorbike
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
           CDs & Vinyl
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Classical Music
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Co-op
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
           Computers & Accessories
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Deals
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Digital Music
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
           DIY & Tools
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            DVD & Blu-ray
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Electronics & Photo
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
           Fashion
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Womens Clothing, Shoes & Jewelry
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
           Men's Clothing, Shoes & Jewelry
          </a>
          
          {/* Add more categories as needed*/ }
        </div>
      </div>

      <input
        placeholder="search Amazon.co.uk"
        className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4"
        type="text"
      />
      <SearchIcon className="h-12 p-4" />
            </div>
            {/*Right*/ }
           <div className='text-white flex  items-center text-xs space-x-6 mx-6 whitespace-nowrap'> 
            <div onClick={!session ? signIn : signOut} className=" cursor-pointer link">
              <p className='hover:underline'>
              {session ? `Hello, ${session.user.name}`: 'Sign In'}
              </p>
              <p className="font-extrabold  md:text-sm ">Account & Lists</p>
            </div> 
            
            <div className=" link">
               <p>Returns</p>
              <p className="font-extrabold  md:text-sm" >& Orders</p>
            </div>
            <div onClick={()=>router.push('/checkout')} className=" relative link flex items-center cursor-pointer">
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                  {items.length}
                  </span>
              <ShoppingCartIcon className="h-10"/>
              <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
            </div>
           </div>
        </div>
        {/*Bottom nav */}
        <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
          <p className='link flex items-center  '>
            <MenuIcon className="h-6 mr-1"/>
            All
          </p> 
          <p className='link'>Prime Video</p>
          <p className='link'>Amazon Business</p>
          <p className='link hidden lg:inline-flex'>Electronics</p>
          <p className='link hidden lg:inline-flex'>Grocery</p>
          <p className='link hidden lg:inline-flex'>Best Sellers</p>
          <p className='link hidden lg:inline-flex'>New Releases</p>
          <p className='link hidden lg:inline-flex'>Amazon Basics</p>
          <p className='link hidden lg:inline-flex'>Today's Deals</p>
          
        </div>
    </header>
   
  );
}

export default Header;

