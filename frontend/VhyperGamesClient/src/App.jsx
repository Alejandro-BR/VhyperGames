import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Error from './pages/Error';
import SobreNosotros from './pages/SobreNosotros';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import DetailsView from './pages/DetailsView';
import PaymentConfirmation from './pages/PaymentConfirmation';
import { AuthProvider } from '../src/context/authcontext';
import { CartProvider } from './context/CartContext';

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
    <Route path="checkout/:modo" element={<Checkout />}/>
    <Route path="paymentConfirmation" element={<PaymentConfirmation />}/>
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;
