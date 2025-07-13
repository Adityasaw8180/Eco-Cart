import { useState, useEffect } from 'react';
import { 
  getAllProducts, 
  getProductById, 
  searchProducts, 
  addToWishlist, 
  removeFromWishlist, 
  getUserWishlist,
  subscribeToWishlist
} from '../firebase/firestore';
import { products } from '../pages/Products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};

export const useProductSearch = (searchTerm) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const search = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchTermLower = searchTerm.toLowerCase();
        console.log('Searching for:', searchTermLower);

        // Search through local products
        const searchResults = products.filter(product => {
          const titleMatch = product.title.toLowerCase().includes(searchTermLower);
          const descriptionMatch = product.description.toLowerCase().includes(searchTermLower);
          return titleMatch || descriptionMatch;
        });

        console.log('Search results:', searchResults);
        setResults(searchResults);
      } catch (err) {
        console.error('Search error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { results, loading, error };
};

export const useWishlist = (userId) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const data = await getUserWishlist(userId);
        setWishlist(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToWishlist(userId, (updatedWishlist) => {
      setWishlist(updatedWishlist);
    });

    return () => unsubscribe();
  }, [userId]);

  const addItem = async (productId) => {
    try {
      await addToWishlist(userId, productId);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (wishlistItemId) => {
    try {
      await removeFromWishlist(userId, wishlistItemId);
    } catch (err) {
      setError(err.message);
    }
  };

  return { wishlist, loading, error, addItem, removeItem };
}; 