import { useEffect, useState } from "react";
import blogsService from "./services/blog";
import { BlogType, LoggedUserType } from "./types";
import loginServices from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState<LoggedUserType | null>(null);

  useEffect(() => {
    blogsService.getAll().then((initialBlogs: BlogType[]) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem("user");
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setUser(user);
      blogsService.setToken(user.token);
    }
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await loginServices.login({
        username,
        password,
      });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  // const newBlog = async (e) => {

  // }

  const LoginForm = () => {
    return (
      <form
        className="bg-white max-w-screen-sm p-6 rounded-md"
        onSubmit={handleLogin}
      >
        <div className="mb-4">
          <p className="text-md font-semibold text-slate-600">Username</p>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full border border-slate-600 rounded-md p-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p className="text-md font-semibold text-slate-600">Password:</p>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border border-slate-600 rounded-md p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-3 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-800"
          >
            Login
          </button>
        </div>
      </form>
    );
  };

  const BlogForm = () => {
    return (
      <form
        className="bg-white max-w-screen-sm p-6 rounded-md"
        // onSubmit={handle}
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 items-center w-full">
      <div className="flex w-full justify-between mb-5 px-3 py-2 ">
        {" "}
        <h1 className="text-3xl">
          {user ? "Bloglist" : "login to application"}
        </h1>
        {user && (
          <button
            className="px-3 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 focus:bg-red-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      <div className="mb-5">{user ? BlogForm() : LoginForm()}</div>

      <div className="flex flex-col ">
        {blogs.map((blog: BlogType) => (
          <BlogCard blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;

const BlogCard: React.FC<{ blog: BlogType }> = ({ blog }) => {
  return (
    <div key={blog.id} className="p-5 bg-white mb-3 rounded-md">
      <div className="">{blog.title}</div>
      <div className="flex w-full">
        <p>{blog.likes}</p>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};