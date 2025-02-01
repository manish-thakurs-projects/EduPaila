import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun, FaUserAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import Logo from '../components/logo';
import { useEffect, useState } from 'react';
import '../components/header.css';

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
    <Navbar className="border-b-2 px-3">
      <Logo size="w-14"/>

      <form onSubmit={handleSubmit} className="sm:flex items-center hidden">
        <div className="relative w-full lg:w-96 responsive-search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="w-full focus:outline-none no-outline-input px-6 h-10 rounded-l-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="flex items-center justify-center w-16 h-10 px-4 rounded-r-full bg-gray-700 text-white transition duration-200 no-outline-button"
        >
          <AiOutlineSearch size={20} />
        </Button>
      </form>

      <div className="flex gap-2 md:order-2">
        <Link to="/search">
          <span className="lg:hidden flex justify-center items-center w-8 h-10 rounded-full">
            <AiOutlineSearch className="text-3xl" />
          </span>
        </Link>

        <span
          className="w-12 h-10 no-outline-button flex items-center justify-center"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
        </span>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt={currentUser.username} img={currentUser.profilePicture} rounded />}
          >
          <Dropdown.Header
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
            >
            <Link to={'/dashboard?tab=profile'}>

              <Avatar alt={currentUser.username} img={currentUser.profilePicture} rounded />
            </Link>
              <span className="block text-sm capitalize">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>

            <div className="sm:hidden flex-col">
              <Navbar.Link active={path === '/'} as={'div'}>
                <Link to="/">Home</Link>
              </Navbar.Link>
              <Navbar.Link active={path === '/about'} as={'div'}>
                <Link to="/about">About</Link>
              </Navbar.Link>
              <Navbar.Link active={path === '/discuss'} as={'div'}>
                <Link to="/discuss">Discuss</Link>
              </Navbar.Link>
            </div>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToBlue" outline className="no-outline-button h-10" pill>
              <FaUserAlt />
            </Button>
          </Link>
        )}

        <Navbar.Toggle className="hidden sm:flex" />
      </div>

      <Navbar.Collapse>
        <div className="hidden sm:flex gap-x-6">
          <Navbar.Link active={path === '/'} as={'div'} className="text-lg">
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'} className="text-lg">
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/discuss'} as={'div'} className="text-lg">
            <Link to="/discuss">Discuss</Link>
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
