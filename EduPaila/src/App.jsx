import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Books from '../pages/Books';
import SignUp from '../pages/SignUp';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import PrivateRoute from '../src/components/PrivateRoute';  // Import PrivateRoute
import OnlyAdminPrivateRoute from '../src/components/OnlyAdminPrivateRoute';
import CreatePost from '../pages/CreatePost';
import UpdatePost from '../pages/UpdatePost';
import PostPage from '../pages/PostPage';
import ScrollToTop from '../src/components/ScrollToTop';
import Search from '../pages/Search';
import Joinus from '../pages/Joinus';

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
        <Route path='/books' element={<Books />} />
        <Route element={<PrivateRoute />}>
          <Route path='/post/:postSlug' element={<PostPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
