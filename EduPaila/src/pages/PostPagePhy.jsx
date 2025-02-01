import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import CloudPdfViewer from '@cloudpdf/viewer';
import Physics from '/assets/physics.jpg'
import PostCard from '../components/PostCard';

export default function PostPagePhy() {
  const viewer = useRef(null);
  useEffect(() => {
    CloudPdfViewer(
      {
        documentId: "eee2079d-b0b6-4267-9812-b6b9eadb9c60",
        darkMode: true
      },
      viewer.current
    ).then((instance) => {});
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-red-500">Failed to load the post.</h1>
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {/* Post Title */}
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        Physics Notes
      </h1>

      {/* Post Category */}
      <Link
        to={`/search?category=notes`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          notes
        </Button>
      </Link>

      {/* Post Image */}
      <img
        src={Physics}
        alt="physics"
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      {/* Post Metadata */}
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
           1hr read
        </span>
      </div>

      {/* Post Content */}
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className="app">
      <div className="viewer" ref={viewer}></div>
    </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      {/* Comment Section */}
      <CommentSection postId={post._id} />

      {/* Recent Articles */}
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}