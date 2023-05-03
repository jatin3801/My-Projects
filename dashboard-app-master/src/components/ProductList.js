import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productsListThunk } from "../redux/ProductListSlice";
import ProductsBox from "./ProductsBox";
import LoadingBar from "./UI/LoadingBar";
import Pagination from "./Pagination";

function ProductList() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.productsList.isLoading);
  const productList = useSelector(
    (state) => state.productsList.productsListData
  );
  const next8elements = useSelector(
    (state) => state.productsList.next8Products
  );

  useEffect(() => {
    if (!productList.length) {
      dispatch(productsListThunk(next8elements));
    }
  }, [productList.length, next8elements, dispatch]);

  return (
    <>
      {!isLoading && (
        <>
          <ProductsBox />
          <Pagination mode='products' />
        </>
      )}
      {isLoading && <LoadingBar />}
    </>
  );
}

export default ProductList;
