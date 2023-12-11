import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State ka initial setup karna
  const [inputs, setInputs] = useState({
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
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });

      // Agar login server dwara successful hota hai
      if (data.success) {
        // LocalStorage mein user ID store karna
        localStorage.setItem("userId", data?.user._id);

        // Redux store ke auth slice mein login action dispatch karna
        dispatch(authActions.login());

        // Success toast dikhana aur home page par redirect karna
        toast.success("User Login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Login form render karna */}
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
          {/* Form heading render karna */}
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          {/* Text input fields render karna */}
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

          {/* "Not a user? Please Register" message aur Register link render karna */}
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
