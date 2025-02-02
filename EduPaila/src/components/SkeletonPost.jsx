import React from 'react';

export default function SkeletonPost() {
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {/* Scroll Progress Bar (Placeholder) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

      {/* Post Image */}
      <div className="mt-10 w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-xl shadow-md animate-pulse"></div>

      {/* Post Metadata */}
      <div className="flex justify-between p-3 border-b border-gray-300 dark:border-gray-700 mx-auto w-full max-w-2xl mt-5">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Post Content */}
      <div className="p-3 max-w-2xl mx-auto w-full space-y-4 mt-5">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* PDF Preview Section */}
      <div className="p-3 max-w-2xl mx-auto w-full mt-10 mb-10">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
        <div className="aspect-w-16 aspect-h-9 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto w-full mt-10 mb-9">
        <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Comment Section */}
      <div className="max-w-2xl mx-auto w-full space-y-4">
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Recent Articles */}
      <div className="flex flex-col justify-center items-center mb-5 mt-10">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-5 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}