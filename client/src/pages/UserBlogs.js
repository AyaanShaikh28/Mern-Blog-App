import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  // State ka initial setup karna, jisme user ke blogs store hote hain
  const [blogs, setBlogs] = useState([]);

  // User ke blogs ko fetch karne ka function
  const getUserBlogs = async () => {
    try {
      // LocalStorage se user ID retrieve karna
      const id = localStorage.getItem("userId");

      // Axios ka upayog karke server se user ke blogs retrieve karna
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);

      // Agar server dwara user ke blogs retrieve successful hote hain, toh state ko update karna
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook ka upayog karke component mount hone par user ke blogs ko fetch karna
  useEffect(() => {
    getUserBlogs();
  }, []);

  // Console par user ke blogs ko log karna (development ke liye)
  console.log(blogs);

  return (
    <div>
      {/* Agar user ke blogs hain toh unko render karna */}
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        // Agar user ke paas koi blog nahi hai toh appropriate message dikhana
        <h1>You Haven't Created a Blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
