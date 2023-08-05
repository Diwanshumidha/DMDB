import React, { useRef, useState } from 'react';
import image from '../assets/logo.png';
import avatar from '../assets/dragon.jpg';
import { Link, NavLink } from 'react-router-dom';
import genres from '../utils/genres';


const MoreLinks = [
  {
    name: 'old',
    link: '/special/old'
  },
  {
    name: 'indian',
    link: '/special/indian'
  },
  {
    name: 'punjabi',
    link: '/special/punjabi'
  },
  {
    name: 'earning',
    link: '/special/earning'
  },
  {
    name: 'top-rated',
    link: '/special/top'
  },
  {
    name: 'popular',
    link: '/special/popular'
  },
  {
    name: 'trending',
    link: '/special/trending'
  },
  {
    name: 'in-theatres',
    link: '/special/theatres'
  },
];

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
  const [ismorelinksOpen, setIsmorelinksOpen] = useState(false)
  const [iscategorieOpen, setcategoriesOpen] = useState(false)


  const dropdownRef = useRef(null);
  const ismorelinkref = useRef(null)
  const iscategoriesref = useRef(null)


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Custom hook to close the dropdown when clicked outside
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  useClickOutside(ismorelinkref,()=>{
    setIsmorelinksOpen(false)
  })

  useClickOutside(iscategoriesref,()=>{
    setcategoriesOpen(false)
  })

  return (
    <div className='h-[70px] fixed z-50 w-full bg-[#04162f] shadow-md justify-between px-8 mb-5 flex'>
      <div className='h-full flex items-center py-4'>
        <Link to={'/'}>
          <img src={image} className='w-[200px]' alt='' />
        </Link>
        <div className=' text-white h-full flex justify-center gap-4 items-center ml-7 '>
        <NavLink className='text-lg' to={'/about'}> About </NavLink>
            <div className='relative flex gap-4 '>

            <button className='text-lg' onClick={()=>setIsmorelinksOpen(true)}>Specials</button>
            {ismorelinksOpen && (
            <div
              ref={ismorelinkref}
              className='absolute top-[45px] left-0 mt-2  bg-white rounded min-w-[10rem] shadow-xl'
            >
              <div className='py-3 '>
                {MoreLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.link}
                    className='block px-9 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    onClick={() => setIsmorelinksOpen(false)}
                  >
                    {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                  </NavLink>
                ))}

              </div>
              
            </div>
          )}
          
            </div>
            <div className='relative flex gap-4 '>

            <button className='text-lg' onClick={()=>setcategoriesOpen(true)}>Categories</button>
            {iscategorieOpen && (
            <div
              ref={iscategoriesref}
              className='absolute top-[45px] left-0 mt-2  bg-white rounded min-w-max shadow-xl'
            >
              <div className='py-3 grid grid-cols-3 '>
                {genres?.genres.map((link) => (
                  <NavLink
                    key={link?.id}
                    to={`/category/${link?.id}`}
                    className='block px-9 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    onClick={() => setcategoriesOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}

              </div>
              
            </div>
          )}
          
            </div>
      </div>
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
