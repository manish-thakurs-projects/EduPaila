import { Link } from "react-router-dom";
import "./page.css";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/post/${post.slug}`}
      className="group relative w-full max-w-sm border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:border-teal-500 transition-all block"
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 group-hover:opacity-80 transition-opacity duration-300"></div>

        <div className=" text-top absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-5xl font-extrabold uppercase animate-pulse transition-all text-center">
          {post.title.split(" ")[0]}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold dark:text-blue-100 text-black group-hover:text-teal-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 italic mt-1">{post.category}</p>
        {post.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {post.description}
          </p>
        )}
      </div>
    </Link>
  );
}
