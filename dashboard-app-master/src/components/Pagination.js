import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { setNextElements, userListThunk } from "../redux/UserListSlice";
import {
  productsListThunk,
  setNextProductsElements,
} from "../redux/ProductListSlice";

export default function PaginationList({ mode }) {
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //
  // }, [dispatch, next8elements]);

  const onChangeHandler = (e, page) => {
    const next = (page - 1) * 8;
    if (mode === "products") {
      dispatch(setNextProductsElements(next));
      dispatch(productsListThunk(next));
    }
    dispatch(setNextElements(next));
    dispatch(userListThunk(next));
  };
  return (
    <Stack spacing={2} m='10px' alignItems='center' color='lightgreen'>
      <Pagination
        sx={{
          "button:hover": { bgcolor: "lightgreen" },
        }}
        onChange={onChangeHandler}
        count={10}
        variant='outlined'
        shape='rounded'
      />
    </Stack>
  );
}
