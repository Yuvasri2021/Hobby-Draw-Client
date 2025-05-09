// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Login, Signup } from './pages/Forms';
import Upload from './pages/Upload';
import Gallery from './pages/Gallery';
import ArtDetails from './pages/ArtDetails';
import MyOrders from './pages/MyOrders';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import EditArtwork from './pages/EditArtwork';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Whishlist from './pages/Whishlist';
import NotAuthorized from './pages/NotAuthorized';
import ArtworkPage from './components/ArtworkPage';
import OrdersPage from './components/OrdersPage';
import ArtistsPage from './components/ArtistsPage';
import CustomersPage from './components/CustomersPage';



function AppWrapper() {
  const location = useLocation();
  // Hide the Navbar only on the '/login' page.
  const hideNavbarRoutes = ['/login'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/artgallery" element={<Gallery />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/art/:id" element={<ArtDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/whishlist" element={<Whishlist />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/artworks" element={<ArtworkPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/customers" element={<CustomersPage />} />




        {/* Private Routes */}
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditArtwork />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
