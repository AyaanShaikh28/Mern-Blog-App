import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  // State ka initial setup karna, jisme blog ki details aur input values store hote hain
  const [blog, setBlog] = useState({});
  const [inputs, setInputs] = useState({});
  const id = useParams().id; // useParams hook ka upayog karke URL se parameter extract karna
  const navigate = useNavigate();

  // Blog ki details ko fetch karne ka function
  const getBlogDetail = async () => {
    try {
      // Axios ka upayog karke server se blog ki details retrieve karna
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);

      // Agar server dwara blog ki details retrieve successful hote hain, toh state ko aur input values ko update karna
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook ka upayog karke component mount hone par blog ki details ko fetch karna
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // Input field mein kuch bhi change hone par state ko update karne ka function
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit hone par blog ko update karne ka function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios ka upayog karke server par PUT request bhejna aur blog ko update karna
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });

      // Agar server dwara blog update successful hota hai, toh toast message dikhana aur navigate karna
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Console par blog ki details ko log karna (development ke liye)
  console.log(blog);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form ko styling aur layout ke liye Box component ka upayog karna */}
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          {/* Update A Post heading */}
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Update A Post
          </Typography>

          {/* Title input field */}
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          {/* Description input field */}
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          {/* Image URL input field */}
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          {/* Update button */}
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default BlogDetails;
