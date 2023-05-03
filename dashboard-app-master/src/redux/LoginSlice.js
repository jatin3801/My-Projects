import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loginDetail: { username: "", password: "" },
  isLoggedIn: false,
  error: "",
  token: "",
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setLoginDetails(state, action) {
      state.loginDetail.username = action.payload.username;
      state.loginDetail.password = action.payload.password;
    },
    setLoginError(state, action) {
      state.error = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const loginThunk = (loginDetail) => {
  console.log("logindetail", loginDetail);
  return async (dispatch, getState) => {
    const authLoginDetails = async () => {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginDetail.username,
          password: loginDetail.password,
        }),
      });
      if (!response.ok) {
        console.log(response);
        dispatch(setLoggedIn(false));
        throw new Error("Invalid credentials !!!");
      }
      return await response.json();
    };
    try {
      const data = await authLoginDetails();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log(token);
      dispatch(setLoggedIn(true));
      dispatch(setToken(token));
    } catch (error) {
      dispatch(setLoginError(error.message));
    }
  };
};

export const { setToken, setLoginError, setLoggedIn, setLoginDetails } =
  loginSlice.actions;
export default loginSlice.reducer;
