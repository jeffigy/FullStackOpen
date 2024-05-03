import { useEffect, useState } from "react";
import blogsService from "./services/blog";
import { BlogType, LoggedUserType } from "./types";
import loginServices from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notifMessage, setNotifMessage] = useState<string | null>("");
  const [notifType, setNotifType] = useState<
    "success" | "error" | null | undefined
  >();
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
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setNotifMessage("All fields are required");
      setNotifType("error");
      setTimeout(() => {
        setNotifMessage(null);
        setNotifType(null);
      }, 5000);
      return;
    }

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
      setNotifMessage("Account not found");
      setNotifType("error");
      setTimeout(() => {
        setNotifMessage(null);
        setNotifType(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const newBlog = async (blogObject: any) => {
    blogsService.create(blogObject).then((res: BlogType) => {
      setBlogs(blogs.concat(res));

      setNotifMessage(`a new blog ${res.title} by ${user?.name} added `);
      setNotifType("success");
      setTimeout(() => {
        setNotifMessage(null);
        setNotifType(null);
      }, 5000);
    });
  };

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
      <Notification message={notifMessage} type={notifType} />
      <div className="mb-5">
        {user ? <BlogForm createBlog={newBlog} /> : LoginForm()}
      </div>

      <div className="flex flex-col ">
        {blogs.map((blog: BlogType) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
