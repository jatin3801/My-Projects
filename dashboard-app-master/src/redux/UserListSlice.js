import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersListData: [],
  isLoading: true,
  next8elements: 0,
  query: "",
};
const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    setUserListData(state, action) {
      state.usersListData = action.payload;
    },
    setUserDataIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNextElements(state, action) {
      if (state.next8elements < 73) {
        state.next8elements = action.payload;
      }
    },
    setUsersQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export const userListThunk = (value) => {
  return async (dispatch) => {
    const fetchingData = async () => {
      const response = await fetch(
        `https://dummyjson.com/users?limit=8&skip=${value}`
      );
      if (!response.ok) {
        throw new Error("Fetching User List Went WRONG");
      }
      const data = await response.json();
      return data;
    };
    try {
      const data = await fetchingData();

      dispatch(setUserListData(data.users));
    } catch (error) {
      console.log(error.message);
    }
    dispatch(setUserDataIsLoading(false));
  };
};

export const {
  setUsersQuery,
  setNextElements,
  setUserDataIsLoading,
  setUserListData,
} = usersListSlice.actions;
export default usersListSlice.reducer;
