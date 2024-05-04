import React, { useState } from "react";
import { BlogType } from "../types";

type BlogFormProps = {
  createBlog: any;
};

const BlogForm: React.FC<BlogFormProps> = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const newBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const blogObject: BlogType = {
      title,
      author,
      url,
      likes: 0,
    };

    createBlog(blogObject);
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form
      className="bg-white max-w-screen-sm p-6 rounded-md"
      onSubmit={newBlog}
    >
      <div className="mb-1">
        <p className="text-md font-semibold text-slate-600"> Title:</p>
        <input
          className="w-full border border-slate-600 rounded-md p-1"
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="" className="text-md font-semibold text-slate-600">
          Author:
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          className="w-full border border-slate-600 rounded-md p-1"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="" className="text-md font-semibold text-slate-600">
          Url:
        </label>
        <input
          type="text"
          id="url"
          className="w-full border border-slate-600 rounded-md p-1"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-3 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-800"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};
export default BlogForm;
