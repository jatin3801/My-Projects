import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productsListData: [],
  isLoading: true,
  next8Products: 0,
  query: "",
};
const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    setProductsListData(state, action) {
      state.productsListData = action.payload;
    },
    setProductsDataIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNextProductsElements(state, action) {
      if (state.next8Products < 73) {
        state.next8Products = action.payload;
      }
    },
    setProductsQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export const productsListThunk = (value) => {
  return async (dispatch) => {
    const fetchingData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=8&skip=${value}`
      );
      if (!response.ok) {
        throw new Error("Fetching Products List Went WRONG");
      }
      const data = await response.json();
      return data;
    };
    try {
      const data = await fetchingData();
      console.log(data.products);
      dispatch(setProductsListData(data.products));
      dispatch(setProductsDataIsLoading(false));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const {
  setProductsDataIsLoading,
  setProductsQuery,
  setNextProductsElements,
  setProductsListData,
} = productsListSlice.actions;
export default productsListSlice.reducer;
