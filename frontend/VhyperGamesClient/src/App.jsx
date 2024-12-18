import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Error from "./pages/Error";
import SobreNosotros from "./pages/AboutUs";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import DetailsView from "./pages/DetailsView";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { AdminProvider } from "./context/AdminContext";
import { ImageProvider } from "./context/ImageContext";
import UserPage from "./pages/UserPage";
import Ethereum from "./components/Ethereum/Ethereum";
import ProductManagement from "./pages/ProductManagement";
import UsersManagement from "./pages/UsersManagement";
import PrivateRoute from "./PrivateRoute";
import ProductManagementForm from "./pages/ProductManagementForm";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const routeDefinition = createRoutesFromElements(
  <Route path="/" element={<RootLayout />} errorElement={<Error />}>
    <Route index element={<Home />} />
    <Route path="catalogo" element={<Catalogo />} />
    <Route path="error" element={<Error />} />
    <Route path="sobre-nosotros" element={<SobreNosotros />} />
    <Route path="juego/:gameId" element={<DetailsView />} />
    <Route path="cart" element={<Cart />} />
    <Route path="checkout/:modo" element={<Checkout />} />
    <Route path="paymentConfirmation" element={<PaymentConfirmation />} />
    <Route path="user" element={<UserPage />} />
    <Route path="EthereumCheckout" element={<Ethereum />} />
    <Route
      path="products-management"
      element={
        <PrivateRoute>
          <ProductManagement />
        </PrivateRoute>
      }
    />
    <Route
      path="product-management-form/:id"
      element={
        <PrivateRoute>
          <ProductManagementForm />
        </PrivateRoute>
      }
    />
    <Route
      path="users-management"
      element={
        <PrivateRoute>
          <UsersManagement />
        </PrivateRoute>
      }
    />
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <AdminProvider>
            <ImageProvider>
              <RouterProvider router={router}></RouterProvider>
            </ImageProvider>
          </AdminProvider>
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
