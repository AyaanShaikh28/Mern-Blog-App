import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // State ka initial setup karna
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Input field ka value change hone par state ko update karna
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit hone par server ko request bhejna
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios ka upayog karke server par POST request bhejna
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      // Agar registration successful hoti hai toh success toast dikhana aur login page par redirect karna
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Registration form render karna */}
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>

          {/* Text input fields render karna */}
          <TextField
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          {/* Submit button render karna */}
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>

          {/* Already registered message aur Login link render karna */}
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
