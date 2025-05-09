import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';


const { addToCart } = useCart();

<div className="flex gap-3 mt-2">
  <button
    onClick={() => addToCart(art)}
    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
  >
    Add to Cart
  </button>

  <Link
    to={`/edit/${art._id}`}
    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
  >
    Edit
  </Link>
</div>
