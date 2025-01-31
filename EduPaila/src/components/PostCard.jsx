import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link
      to={`/post/${post.slug}`}
      className="group relative w-full max-w-sm border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:border-teal-500 transition-all block"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={post.image}
          alt="post cover"
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-teal-600 transition-all"
        >
          Learn More
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 italic mt-1">{post.category}</p>
        {/* Conditionally render the description */}
        {post.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {post.description}
          </p>
        )}
      </div>
    </Link>
  );
}