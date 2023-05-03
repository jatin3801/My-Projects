import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

function Rightbar() {
  return (
    <Box flex={3} p={2}>
      <Box display={"flex"} justifyContent='space-between' alignItems='center'>
        <Typography
          fonstsize='large'
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "30px",
            lineHeight: "50px",

            color: "#777575",
          }}
        >
          {" "}
          Users{" "}
        </Typography>
        <Box display={"flex"} justifyContent='space-evenly' alignItems='center'>
          <SearchBar />
          <Avatar sx={{ bgcolor: "greenyellow" }}>N</Avatar>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#FFFFFF",
          borderradius: "10px",
        }}
      >
        {" "}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Rightbar;
