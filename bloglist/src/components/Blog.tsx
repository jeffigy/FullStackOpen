import React, { useState } from "react";
import { BlogType } from "../types";

type BlogProps = {
  blog: BlogType;
};

const Blog: React.FC<BlogProps> = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const details = showDetails ? "block" : "hidden";
  return (
    <div className="p-5 bg-white mb-3 rounded-md text-slate-500">
      <div className="font-bold">
        {blog.title}{" "}
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
          <button className="border px-3 py-1 text-xs rounded-sm border-blue-600 text-blue-600">
            like
          </button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};
export default Blog;
