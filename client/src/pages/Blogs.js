import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  // State ka initial setup karna, jisme blogs store hote hain
  const [blogs, setBlogs] = useState([]);

  // Sabhi blogs ko fetch karne ka function
  const getAllBlogs = async () => {
    try {
      // Axios ka upayog karke server se sabhi blogs retrieve karna
      const { data } = await axios.get("/api/v1/blog/all-blog");

      // Agar server dwara sabhi blogs retrieve successful hote hain, toh state ko update karna
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook ka upayog karke component mount hone par sabhi blogs ko fetch karna
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {/* Agar blogs hain toh unko render karna */}
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            // Yadi user login hai aur blog usi user ka hai toh isUser prop ko true set karna, nahi toh false
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;
