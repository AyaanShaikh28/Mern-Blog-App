// Header.js file hai jo ek React functional component define karta hai.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // Global state ko prapt karna
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state ka initial state set karna
  const [value, setValue] = useState();

  // Logout ka functionality handle karna
  const handleLogout = () => {
    try {
      dispatch(authActions.logout()); // Redux action se logout signal bhejna
      toast.success("Logout Successfully"); // Toast message dikhana
      navigate("/login"); // React Router se "/login" page par redirect karna
      localStorage.clear(); // LocalStorage ko clear karna
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Header ka UI render karna */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog APP</Typography>
          {/* Agar user login hai toh navigation tabs dikhana */}
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          {/* Agar user login nahi hai toh login/register buttons dikhana */}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {/* Agar user login hai toh logout button dikhana */}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
