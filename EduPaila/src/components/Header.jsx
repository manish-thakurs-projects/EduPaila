import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaHome, FaInfoCircle, FaMoon, FaSun, FaUserAlt, FaVideo } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaNoteSticky } from "react-icons/fa6";
import { signoutSuccess } from '../redux/user/userSlice';
import Logo from '../components/logo';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 px-4 sm:px-6 lg:px-8 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm top-0 z-50">
      <Logo size="w-12 sm:w-14 hover:scale-105 transition-transform" />

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="hidden sm:flex items-center w-full max-w-2xl mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <AiOutlineSearch className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-12 pr-4 py-2.5 text-sm rounded-full border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-600 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>

      <div className="flex gap-3 items-center md:order-2">
        {/* Mobile Search Icon */}
        <Link to="/search" className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <AiOutlineSearch className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-3.5 dark:bg-gray-800 bg-slate-400 hover:bg-slate-300 focus:outline-none rounded-full transition-all hover:scale-105"
        >
          {theme === 'light' ? (
            <FaSun/>
          ) : (
            <FaMoon/>
          )}
        </button>

        {/* User Authentication */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar 
                alt={currentUser.username} 
                img={currentUser.profilePicture} 
                rounded
                className="rounded-full focus:outline-none outline-none"
              />
            }
            className="!min-w-[200px] !rounded-xl !border !border-gray-200 dark:!border-gray-700 !bg-white dark:!bg-gray-800"
          >
            <Dropdown.Header className="text-center p-4 border-b border-gray-200 dark:border-gray-700">
              <Avatar 
                alt={currentUser.username} 
                img={currentUser.profilePicture} 
                size="lg"
                className="mx-auto mb-3"
                rounded
              />
              <span className="block text-sm font-semibold capitalize text-gray-900 dark:text-white">
                {currentUser.username}
              </span>
              <span className="block text-sm text-gray-500 truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="text-gray-700 dark:text-gray-200">Profile</span>
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider className="my-1" />
            <Dropdown.Item 
              onClick={handleSignout}
              className="px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
            >
              Sign Out
            </Dropdown.Item>

            {/* Mobile Navigation */}
            <div className="sm:hidden space-y-2 p-2">
              <Navbar.Link 
                active={path === '/'} 
                as={Link} 
                to="/" 
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </Navbar.Link>
              <Navbar.Link 
                active={path === '/about'} 
                as={Link} 
                to="/about" 
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About
              </Navbar.Link>
              <Navbar.Link 
                active={path === '/quizzes'} 
                as={Link} 
                to="/quizzes" 
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Quizzes
              </Navbar.Link>
            </div>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <button 
              gradientDuoTone="purpleToBlue" 
              className="group p-3.5 focus:outline-none dark:bg-slate-800 bg-slate-400 hover:bg-slate-300 rounded-full transition-all hover:scale-105"
            >
              <FaUserAlt />
            </button>
          </Link>
        )}
      </div>

      {/* Desktop Navigation */}
      <Navbar.Collapse className="sm:flex space-x-4 mt-0">
  <a 
    href="/" 
    className={`w-8 h-8 rounded-full flex justify-center items-center transition-all hover:scale-150 ${path === '/' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-gray-300'}`}
    title="Home"
  >
    <FaHome className={`${path === '/' ? 'text-white' : 'text-gray-700 dark:text-white'}`} />
  </a>
  <a 
    href="/about" 
    className={`w-8 h-8 rounded-full flex justify-center items-center transition-all hover:scale-150 ${path === '/about' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-gray-300'}`}
    title="About"
  >
    <FaInfoCircle className={`${path === '/about' ? 'text-white' : 'text-gray-700 dark:text-white'}`} />
  </a>
  <a 
    href="/quizzes" 
    className={`w-8 h-8 rounded-full flex justify-center items-center transition-all hover:scale-150 ${path === '/quizzes' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-gray-300'}`}
    title="Quizzes"
  >
    <FaNoteSticky className={`${path === '/quizzes' ? 'text-white' : 'text-gray-700 dark:text-white'}`} />
  </a>
  <a 
    href="/video" 
    className={`w-8 h-8 rounded-full flex justify-center items-center transition-all hover:scale-150 ${path === '/video' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-gray-300'}`}
    title="Videos"
  >
    <FaVideo className={`${path === '/video' ? 'text-white' : 'text-gray-700 dark:text-white'}`} />
  </a>
</Navbar.Collapse>


    </Navbar>
  );
}