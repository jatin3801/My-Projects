import * as React from "react";

import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { useDispatch } from "react-redux";
import { setUsersQuery } from "../../redux/UserListSlice";
import { setProductsQuery } from "../../redux/ProductListSlice";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = React.useState("");
  const location = useLocation();
  const { pathname } = location;
  const dipatch = useDispatch();
  React.useEffect(() => {
    setSearch("");
    if (pathname === "/products") {
      dipatch(setUsersQuery(""));
      return;
    }
    dipatch(setProductsQuery(""));
  }, [pathname, dipatch]);

  const onChangeHandler = ({ target: { value } }) => {
    setSearch(value);
    if (location.pathname === "/products") {
      dipatch(setProductsQuery(value));

      return;
    } else if (location.pathname === "/") {
      dipatch(setUsersQuery(value));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 10px",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          border: "2px solid white",

          padding: "5px",
          width: "300px",
          height: "30px",
          borderRadius: "10px",
        }}
      >
        <InputBase
          placeholder='Search…'
          value={search}
          inputProps={{ "aria-label": "search" }}
          onChange={onChangeHandler}
        />
      </Box>
    </Box>
  );
}
