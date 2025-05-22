// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Forms from './components/Forms';
import Upload from './pages/Upload';
import Gallery from './pages/Gallery';
import ArtDetails from './pages/ArtDetails';
import MyOrders from './pages/MyOrders';
import CartPage from './pages/CartPage';
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
import ErrorPage from './pages/ErrorPage';
import AdminLogin from './pages/AdminLogin';
import ArtistLogin from './pages/ArtistLogin';
import CustomerLogin from './pages/CustomerLogin';


function AppWrapper() {
  const location = useLocation();
  // Hide the Navbar only on the '/login' page.
  const hideNavbarRoutes = ['/login'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
     
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Forms />} />
        <Route path="/signup" element={<Forms />} />
        <Route path="/" element={<Home />} />
        <Route path="/artgallery" element={<Gallery />} />
        <Route path="/art/:id" element={<ArtDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/whishlist" element={<Whishlist />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/artworks" element={<ArtworkPage />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
         <Route path="/error" element={<ErrorPage />} />
        <Route path="/" element={<h1>Welcome to Art App</h1>} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/artist-login" element={<ArtistLogin />} />
        <Route path="/customer-login" element={<CustomerLogin />} />



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
