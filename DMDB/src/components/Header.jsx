import React, { useRef, useState } from 'react';
import image from '../assets/logo.png';
import avatar from '../assets/dragon.jpg';
import { Link, NavLink } from 'react-router-dom';
import genres from '../utils/genres';
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'



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

  const [ismenuOpen, setismenuOpen] = useState(false)
  const handlemenuOpen = () => {
    setismenuOpen(prev => !prev)
  }


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

  useClickOutside(ismorelinkref, () => {
    setIsmorelinksOpen(false)
  })

  useClickOutside(iscategoriesref, () => {
    setcategoriesOpen(false)
  })

  return (
    <div className='h-[70px] fixed z-50 w-full bg-[#04162f] shadow-md justify-between px-3 sm:px-8 mb-5 flex'>
      <div className='h-full flex items-center py-4'>
        <Link to={'/'}>
          <img src={image} className='w-[200px]' alt='' />
        </Link>
        <div className=' text-white h-full  justify-center gap-4 items-center ml-7 hidden sm:flex '>
          <NavLink className='text-lg hidden sm:flex' to={'/about'}> About </NavLink>
          <div className='relative flex gap-4 '>

            <button className='text-lg' onClick={() => setIsmorelinksOpen(true)}>Specials</button>
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

            <button className='text-lg' onClick={() => setcategoriesOpen(true)}>Categories</button>
            {iscategorieOpen && (
              <div
                ref={iscategoriesref}
                className='absolute top-[45px] right-[50%] translate-x-[30%] md:translate-x-[50%]   mt-2  bg-white rounded min-w-max shadow-xl'
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



      <div className='relative h-full  items-center gap-2 flex '>
        <div className=' text-2xl text-white mr-4 cursor-pointer' onClick={handlemenuOpen}>
          <GiHamburgerMenu />
        </div>
        <img
          src={avatar}
          onClick={handleDropdownToggle}
          className='w-10 h-10 rounded-full hidden xs:flex cursor-pointer hover:rotate-45 transition-all hover:shadow-2xl shadow-white duration-[1s]'
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

      <div className={`${!ismenuOpen ? 'clip-hidden' : 'clip-visible'}  md:hidden flex-col fixed flex w-full backdrop-filter mobile_menu  backdrop-blur-2xl top-0 left-0 bg-opacity-97 bg-primary-green shadow-lg px-5 py-5  h-screen items-center`}>
      <div className=' text-white ml-auto text-3xl hover:text-[#072755] cursor-pointer   ' onClick={handlemenuOpen}> <MdClose/></div>
        <ul className={` gap-3 items-center  md:flex flex-col  overflow-scroll  text-white p-5 `}>
          <li className=' h-5 text-3xl mt-7 '>
            <NavLink onClick={() => { setismenuOpen(false) }} to={"/"} >Home</NavLink>
          </li>
          <li className=' h-5 text-3xl mt-7 '>
            <NavLink to="/" onClick={() => { setismenuOpen(false) }}>Shop</NavLink>
          </li>
          <li className=' h-5 text-3xl mt-7 '>
            <NavLink to="/contact" onClick={() => { setismenuOpen(false) }}>Contact Us</NavLink>
          </li>
          <li className=' h-5 text-3xl mt-7'>
            <NavLink to="/about" onClick={() => { setismenuOpen(false) }}>About Us</NavLink>
          </li>
          <li className=' h-5 text-3xl mt-7'>
            <NavLink to="/faq">FAQ</NavLink>
          </li>
          <li className=' h-5 text-3xl mt-7'>
            <NavLink to="/faq">FAQ</NavLink>
          </li><li className=' h-5 text-3xl mt-7'>
            <NavLink to="/faq">FAQ</NavLink>
          </li><li className=' h-5 text-3xl mt-7'>
            <NavLink to="/faq">FAQ</NavLink>
          </li>

        </ul>

      </div>



    </div>
  );
};

export default Header;
