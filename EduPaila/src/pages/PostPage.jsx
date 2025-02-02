import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import SkeletonPost from '../components/SkeletonPost'; // Import the Skeleton Loader
import '../components/page.css'



export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  function convertToEmbedUrl(url) {
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  }

  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    setScrollProgress(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) return <SkeletonPost />; // Replace Spinner with Skeleton

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-red-500">Failed to load the post.</h1>
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-blue-500"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Post Image with Title and Category over it */}
      <div className="relative">
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 max-h-[400px] w-full object-cover rounded-xl shadow-md"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-opacity-50">
  <h1 className="text-4xl p-3 text-white text-top mx-auto lg:text-8xl uppercase text-center">
    {post && post.title}
  </h1>
  <Link to={`/search?category=${post && post.category}`} className="text-2xl text-top uppercase hover:underline" >
    <button className="text-2xl text-top uppercase hover:underline">
      {post && post.category}
    </button>
  </Link>
</div>

      </div>

      {/* Post Metadata */}
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      {/* Post Content */}
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      {/* PDF Preview Section */}
      {post && post.pdfUrl && (
        <div className="p-3 max-w-2xl mx-auto w-full mt-3 mb-10">
          <h2 className="text-xl font-semibold mb-3">Attached PDF</h2>
          <div className="aspect-w-16 aspect-h-9 border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              src={convertToEmbedUrl(post.pdfUrl)}
              title={post.title}
              width="100%"
              height="500px"
              style={{ border: 'none' }}
              allowFullScreen
            >
              <p>
                Your browser does not support embedded PDFs. Use other browsers if possible or
                <a href="https://wa.me/9779801996736"> contact us</a>
              </p>
            </iframe>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto w-full mt-10 mb-9">
        <CallToAction />
      </div>

      {/* Comment Section */}
      <CommentSection postId={post._id} />

      {/* Recent Articles */}



      <div className="flex flex-col justify-center w-full items-center mb-5">
  <h1 className="text-xl mt-5">Recent Uploads</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 w-full px-4">
    {recentPosts && recentPosts.map((p) => (
      <PostCard key={p._id} post={p} />
    ))}
  </div>
</div>

 



    </main>
  );
}
