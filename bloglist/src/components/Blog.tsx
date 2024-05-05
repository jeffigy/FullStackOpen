import React, { useState } from "react";
import { BlogType } from "../types";
type BlogProps = {
  blog: BlogType;
  updateBlog: any;
  removeBlog: any;
};

const Blog: React.FC<BlogProps> = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const details = showDetails ? "block" : "hidden";

  const likeBlog = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateBlog(blog);
  };

  const deleteBlog = () => {
    removeBlog(blog);
  };

  return (
    <div className="p-5 bg-white mb-3 rounded-md text-slate-500">
      <div className="font-bold">
        {blog.title}
        <span>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="border px-3 py-1 text-xs rounded-sm border-blue-600 text-blue-600"
          >
            {showDetails ? "Hide" : "View"}
          </button>
        </span>
      </div>
      <div className={`${details}`}>
        <p>{blog.url}</p>
        <div className="flex">
          <p className="mr-2">
            likes: <span className="font-semibold">{blog.likes}</span>
          </p>
          <button
            onClick={likeBlog}
            className="border px-3 py-1 text-xs rounded-sm border-blue-600 text-blue-600"
          >
            like
          </button>
        </div>
        <p>{blog.author}</p>
      </div>
      <p>posted by: {blog.user!.name}</p>
      <button
        onClick={deleteBlog}
        className="border px-3 py-1 text-xs bg-red-600 hover:bg-red-700 focus:bg-red-800 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
export default Blog;
