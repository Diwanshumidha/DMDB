import React, { useState } from 'react';
import image from '../assets/logo.png';
import avatar from '../assets/dragon.jpg';
import { Link } from 'react-router-dom';

// Custom hook to handle click outside
function useClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = React.useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Custom hook to close the dropdown when clicked outside
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div className='h-[70px] fixed z-50 w-full bg-[#04162f] shadow-md justify-between px-8 mb-5 flex'>
      <div className='h-full flex items-center py-4'>
        <Link to={'/'}>
          <img src={image} className='w-[200px]' alt='' />
        </Link>
      </div>
      <div className='relative h-full flex items-center gap-2'>
        <span className='text-gray-300 hidden md:block'>Diwanshu Midha</span>
        <img
          src={avatar}
          onClick={handleDropdownToggle}
          className='w-10 h-10 rounded-full cursor-pointer hover:rotate-45 transition-all hover:shadow-2xl shadow-white duration-[1s]'
          alt=''
        />
        {isDropdownOpen && (
          <div ref={dropdownRef} className='fixed top-0 right-0 mt-16 px-3 mr-4 w-[15rem] bg-white rounded shadow-xl'>
            {/* Add dropdown content here */}
            <div className='py-3'>
              <span className='text-lg'>Diwanshu Midha</span>
            </div>
            <hr />
            <button className='w-full text-left py-2 hover:bg-gray-200'>
              Edit Profile
            </button>
            <button className='w-full text-left py-2 hover:bg-gray-200'>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
