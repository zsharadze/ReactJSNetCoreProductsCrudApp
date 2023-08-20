import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Products } from "./pages/Products";
import App from "./App";
import { ErrorPage } from "./pages/ErrorPage";
import { AddProduct } from "./pages/AddProduct";
import { ProductDetails } from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "addproduct/:id",
        element: <AddProduct />,
      }, 
       {
        path: "productdetails/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
