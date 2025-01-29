import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import SignIn from '../src/pages/SignIn';
import Dashboard from '../src/pages/Dashboard';
import Discuss from '../src/pages/Discuss';
import SignUp from '../src/pages/SignUp';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import PrivateRoute from '../src/components/PrivateRoute';  // Import PrivateRoute
import OnlyAdminPrivateRoute from '../src/components/OnlyAdminPrivateRoute';
import CreatePost from '../src/pages/CreatePost';
import UpdatePost from '../src/pages/UpdatePost';
import PostPage from '../src/pages/PostPage';
import ScrollToTop from '../src/components/ScrollToTop';
import Search from '../src/pages/Search';
import Joinus from '../src/pages/JoinUs';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route path='/joinus' element={<Joinus />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/discuss' element={<Discuss />} />
        <Route element={<PrivateRoute />}>
          <Route path='/post/:postSlug' element={<PostPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
