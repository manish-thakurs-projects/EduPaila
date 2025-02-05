import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import SignIn from '../src/pages/SignIn';
import Dashboard from '../src/pages/Dashboard';
import Mcqpage from '../src/pages/Mcq';
import UpdateQuiz from './pages/UpdateQuiz';
import SignUp from '../src/pages/SignUp';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import PrivateRoute from '../src/components/PrivateRoute';
import OnlyAdminPrivateRoute from '../src/components/OnlyAdminPrivateRoute';
import CreatePost from '../src/pages/CreatePost';
import UpdatePost from '../src/pages/UpdatePost';
import PostPage from '../src/pages/PostPage';
import ScrollToTop from '../src/components/ScrollToTop';
import CreateVideo from './pages/CreateVideo';
import VideoPage from './pages/VideoPage';
import Search from '../src/pages/Search';
import Joinus from '../src/pages/JoinUs';
import QuizPage from '../src/pages/QuizPage'; // Public Quiz Page
import CreateQuiz from '../src/pages/CreateQuiz'; // Admin Quiz Creation
import DashQuizzes from '../src/components/DashQuizzes'; // Admin Quiz Management

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
        <Route path='/quizzes' element={<Mcqpage />} />

          <Route path='/post/:postSlug' element={<PostPage />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/quiz/:slug' element={<QuizPage />} />
        <Route path='/video/:slug' element={<VideoPage/>} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/createvideo' element={<CreateVideo/>} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
          <Route path='/createquiz' element={<CreateQuiz />} />
          <Route path='/update-quiz/:quizId' element={<UpdateQuiz />} /> {/* Uses Quiz ID */}
          <Route path='/admin-quizzes' element={<DashQuizzes />} /> {/* Admin Quiz List */}
        </Route>

        {/* Public Quiz Page */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
