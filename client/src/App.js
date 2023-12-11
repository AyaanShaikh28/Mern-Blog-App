import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* Header component ko import karna */}
      <Header />

      {/* Toaster component ko import karna */}
      <Toaster />

      {/* React Router ke Routes aur Route components ka upayog karna */}
      <Routes>
        {/* Default route ke liye */}
        <Route path="/" element={<Blogs />} />

        {/* /blogs path ke liye Blogs component ko render karna */}
        <Route path="/blogs" element={<Blogs />} />

        {/* /my-blogs path ke liye UserBlogs component ko render karna */}
        <Route path="/my-blogs" element={<UserBlogs />} />

        {/* /blog-details/:id path ke liye BlogDetails component ko render karna */}
        <Route path="/blog-details/:id" element={<BlogDetails />} />

        {/* /create-blog path ke liye CreateBlog component ko render karna */}
        <Route path="/create-blog" element={<CreateBlog />} />

        {/* /login path ke liye Login component ko render karna */}
        <Route path="/login" element={<Login />} />

        {/* /register path ke liye Register component ko render karna */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
