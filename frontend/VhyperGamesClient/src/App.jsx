import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Error from './pages/Error';
import SobreNosotros from './pages/SobreNosotros';
import DetailsViewLegacy from './pages/DetailsViewLegacy';
import { AuthProvider } from '../src/context/authcontext';
import Cart from './pages/Cart';

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
    <Route path="juego/:gameId" element={<DetailsViewLegacy />} />
    <Route path="cart" element={<Cart />} />
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>;
    </AuthProvider>
)}

export default App;
