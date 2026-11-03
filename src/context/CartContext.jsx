import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CART_STORAGE_KEY = 'crave_it_design_03_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState('ALL'); // 'ALL' | 'VEG' | 'NON-VEG'
  const [toastMessage, setToastMessage] = useState(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const addToCart = (product, quantity = 1, isHalf = false, variant = null) => {
    if (!product) return;

    const chosenPrice = isHalf && product.halfPrice ? product.halfPrice : product.price;
    const chosenVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : null);

    let variantLabel = isHalf ? 'Half Portion' : 'Standard Full';
    if (chosenVariant) {
      variantLabel = `${chosenVariant} • ${variantLabel}`;
    }

    const variantKey = chosenVariant ? '-' + String(chosenVariant).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    const cartItemId = `${product.id}-${isHalf ? 'half' : 'full'}${variantKey}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevCart,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          category: product.category,
          isVeg: product.isVeg,
          price: chosenPrice,
          isHalf,
          variant: chosenVariant,
          variantLabel,
          image: product.image,
          pieces: isHalf ? 'Half plate' : (product.pieces || '1 portion'),
          quantity
        }
      ];
    });

    const displayTitle = chosenVariant ? `"${product.name} (${chosenVariant})"` : `"${product.name}"`;
    showToast(`Added ${quantity}× ${displayTitle} to your bag.`);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = cartItemId => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    showToast('Shopping bag cleared.', 'info');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  // Delivery fee & packaging for authenticity
  const deliveryFee = cartSubtotal > 499 || cartSubtotal === 0 ? 0 : 40;
  const packagingFee = cart.length > 0 ? 25 : 0;
  const cartTotal = cartSubtotal + deliveryFee + packagingFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        packagingFee,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        selectedProduct,
        setSelectedProduct,
        openProductModal: prod => setSelectedProduct(prod),
        closeProductModal: () => setSelectedProduct(null),
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        dietFilter,
        setDietFilter,
        toastMessage,
        setToastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
