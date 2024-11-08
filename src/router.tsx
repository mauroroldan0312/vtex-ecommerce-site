import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import UserDetail from "./pages/UserDetail";
import "./index.css";
import { UserProvider } from "./shared";
import RequireAuth from "./pages/RequiredAuth";
import { ProductsProvider } from "./shared/providers/ProductsProvider";

export const Router = () => {
  return (
    <BrowserRouter basename="/test-vtex-ecommerce-site">
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route
              path="products"
              element={
                <RequireAuth>
                  <ProductsProvider>
                    <ProductList />
                  </ProductsProvider>
                </RequireAuth>
              }
            />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route
              path="user-detail"
              element={
                <RequireAuth>
                  <UserDetail />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
