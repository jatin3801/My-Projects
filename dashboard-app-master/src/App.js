import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./components/UI/Dashboard";
import LoadingBar from "./components/UI/LoadingBar";
import { tokenLoader } from "./util/Auth";

const UsersListPage = lazy(() => import("./pages/UsersListPage"));
const ProductListPage = lazy(() => import("./pages/ProductListPage"));

const routes = [
  {
    path: "/",
    id: "root",
    element: <Dashboard />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingBar />}>
            <UsersListPage />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<LoadingBar />}>
            <ProductListPage />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
