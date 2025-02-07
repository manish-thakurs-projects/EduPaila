import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';
import Dashboard from '../src/pages/Dashboard';
import Mcqpage from '../src/pages/Mcq';
import QuizPage from '../src/pages/QuizPage';
import Video from '../src/pages/Video';
import VideoPage from '../src/pages/VideoPage';
import Search from '../src/pages/Search';
import JoinUs from '../src/pages/JoinUs';
import PostPage from '../src/pages/PostPage';

import CreatePost from '../src/pages/CreatePost';
import UpdatePost from '../src/pages/UpdatePost';
import CreateVideo from '../src/pages/CreateVideo';
import CreateQuiz from '../src/pages/CreateQuiz';
import UpdateQuiz from '../src/pages/UpdateQuiz';
import DashQuizzes from '../src/components/DashQuizzes';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import ScrollToTop from '../src/components/ScrollToTop';
import PrivateRoute from '../src/components/PrivateRoute';
import OnlyAdminPrivateRoute from '../src/components/OnlyAdminPrivateRoute';


import UpdateVideo from '../src/pages/UpdateVideo';



export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/quizzes" element={<Mcqpage />} />
        <Route path="/video" element={<Video />} />

        {/* Protected User Routes */}
        <Route element={<PrivateRoute />}>
        <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
        </Route>

        {/* Admin-Only Routes */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route path="/createvideo" element={<CreateVideo />} />
          <Route path="/updatevideo/:videoId" element={<UpdateVideo />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/update-quiz/:quizId" element={<UpdateQuiz />} />
          <Route path="/admin-quizzes" element={<DashQuizzes />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
