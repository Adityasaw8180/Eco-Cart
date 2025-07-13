import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

// Products Collection
export const productsCollection = collection(db, 'products');

// Get all products
export const getAllProducts = async () => {
  try {
    const q = query(productsCollection, orderBy('title'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (searchTerm) => {
  try {
    if (!searchTerm.trim()) {
      return [];
    }

    const searchTermLower = searchTerm.toLowerCase();
    console.log('Searching for:', searchTermLower);

    // First, let's get all products to see what we're working with
    const allProducts = await getAllProducts();
    console.log('All products:', allProducts);

    // Create a case-insensitive search query
    const q = query(
      productsCollection,
      where('title', '>=', searchTermLower),
      where('title', '<=', searchTermLower + '\uf8ff'),
      orderBy('title'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    console.log('Search results:', querySnapshot.docs.map(doc => doc.data()));

    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // If no results found in title, try searching in description
    if (results.length === 0) {
      const descQuery = query(
        productsCollection,
        where('description', '>=', searchTermLower),
        where('description', '<=', searchTermLower + '\uf8ff'),
        orderBy('description'),
        limit(10)
      );

      const descSnapshot = await getDocs(descQuery);
      console.log('Description search results:', descSnapshot.docs.map(doc => doc.data()));

      results.push(...descSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    }

    // Remove duplicates
    const uniqueResults = Array.from(new Map(results.map(item => [item.id, item])).values());
    console.log('Final results:', uniqueResults);

    return uniqueResults;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Add product to wishlist
export const addToWishlist = async (userId, productId) => {
  try {
    const wishlistRef = collection(db, 'users', userId, 'wishlist');
    await addDoc(wishlistRef, {
      productId,
      addedAt: new Date()
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (userId, wishlistItemId) => {
  try {
    const docRef = doc(db, 'users', userId, 'wishlist', wishlistItemId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Get user's wishlist
export const getUserWishlist = async (userId) => {
  try {
    const wishlistRef = collection(db, 'users', userId, 'wishlist');
    const q = query(wishlistRef, orderBy('addedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const wishlistItems = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const productData = await getProductById(doc.data().productId);
        return {
          id: doc.id,
          ...productData,
          addedAt: doc.data().addedAt
        };
      })
    );
    
    return wishlistItems;
  } catch (error) {
    console.error('Error getting wishlist:', error);
    throw error;
  }
};

// Real-time wishlist listener
export const subscribeToWishlist = (userId, callback) => {
  const wishlistRef = collection(db, 'users', userId, 'wishlist');
  const q = query(wishlistRef, orderBy('addedAt', 'desc'));
  
  return onSnapshot(q, async (snapshot) => {
    const wishlistItems = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const productData = await getProductById(doc.data().productId);
        return {
          id: doc.id,
          ...productData,
          addedAt: doc.data().addedAt
        };
      })
    );
    callback(wishlistItems);
  });
}; 