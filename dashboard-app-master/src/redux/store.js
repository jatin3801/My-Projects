import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";
import productListSlice from "./ProductListSlice";
import usersListSlice from "./UserListSlice";

const store = configureStore({
  reducer: {
    userList: usersListSlice,
    login: loginSlice,
    productsList: productListSlice,
  },
});
export default store;
