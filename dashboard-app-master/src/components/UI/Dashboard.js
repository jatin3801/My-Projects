import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { setLoginError } from "../../redux/LoginSlice";

import Login from "../LogIn";
import Rightbar from "./Rightbar";
import SideBar from "./SideBar";

function Dashboard() {
  const token = useLoaderData();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  useEffect(() => {
    if (!token) {
      dispatch(setLoginError("Logged Out"));
    }
  }, [token, dispatch]);

  return (
    <>
      {!isLoggedIn && !token && <Login />}

      <Box>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <SideBar />
          <Rightbar />
        </Stack>
      </Box>
    </>
  );
}

export default Dashboard;
