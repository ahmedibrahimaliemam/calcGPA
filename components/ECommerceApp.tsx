
"use client"
import { useState, useEffect, createContext, useContext } from 'react';
import Image from 'next/image';
import { FaHeart, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  favorites: Product[];
  user: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const products: Product[] = [
  { id: 1, name: "Chair", price: 50.33, image: "https://raw.githubusercontent.com/ahmedibrahimaliemam/react-redux-tool-kit/master/public/imgs/glass.jpg" },
  { id: 2, name: "Glass", price: 60, image: "https://github.com/ahmedibrahimaliemam/react-redux-tool-kit/blob/master/public/imgs/bag.jpg?raw=true" },
  { id: 3, name: "Chair", price: 50.33, image: "https://github.com/ahmedibrahimaliemam/react-redux-tool-kit/blob/master/public/imgs/headphone.jpg?raw=true" },
  { id: 4, name: "Glass", price: 60, image: "https://github.com/ahmedibrahimaliemam/react-redux-tool-kit/blob/master/public/imgs/chair.jpg?raw=true" },
  { id: 5, name: "Chair", price: 50.33, image: "https://github.com/ahmedibrahimaliemam/react-redux-tool-kit/blob/master/public/imgs/dell.jpg?raw=true" },
  { id: 6, name: "Glass", price: 60, image: "https://github.com/ahmedibrahimaliemam/react-redux-tool-kit/blob/master/public/imgs/head.jpg?raw=true" },

];

export default function ECommerceApp() {
  const [view, setView] = useState<'products' | 'cart' | 'favorites' | 'auth'>('products');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    const savedUser = localStorage.getItem('user');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedUser) setUser(savedUser);
  }, []);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [cart, favorites]);


  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing?.quantity === 1) {
        return prev.filter(item => item.id !== productId);
      }
      return prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  const clearCart = () => setCart([]);


  const addToFavorites = (product: Product) => {
    setFavorites(prev => 
      prev.some(f => f.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };


  const login = (email: string, password: string) => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    
    if (email === storedEmail && password === storedPassword) {
      const storedUser = localStorage.getItem('user') || '';
      setUser(storedUser);
      setView('products');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = (name: string, email: string, password: string) => {
    if (localStorage.getItem('email') === email) {
      alert('Email already registered!');
      return false;
    }
    
    localStorage.setItem('user', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    setUser(name);
    setView('products');
    return true;
  };
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name } = formData;
    
    if (authMode === 'login') {
      if (login(email, password)) {
        setFormData({ name: '', email: '', password: '' });
      } else {
        alert('Invalid credentials!');
      }
    } else {
      if (name && email && password.length >= 8) {
        if (register(name, email, password)) {
          setFormData({ name: '', email: '', password: '' });
        }
      } else {
        alert('Please fill all fields correctly!');
      }
    }
  };

  
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <AppContext.Provider value={{
      cart,
      favorites,
      user,
      addToCart,
      removeFromCart,
      clearCart,
      addToFavorites,
      removeFromFavorites,
      login,
      logout,
      register
    }}>
      <div className="min-h-screen bg-gray-100">
        {/* nav */}
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <button onClick={() => setView('products')} className="text-xl font-bold">
              E-Commerce
            </button>
            
            <div className="flex items-center gap-6">
              <button className="relative" onClick={() => setView('cart')}>
                <FaShoppingCart className="text-2xl" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <button className="relative" onClick={() => setView('favorites')}>
                <FaHeart className="text-2xl" />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
                    {favorites.length}
                  </span>
                )}
              </button>
              
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">{user}</span>
                  <FaSignOutAlt 
                    className="text-2xl cursor-pointer"
                    onClick={logout}
                  />
                </div>
              ) : (
                <button onClick={() => setView('auth')}>
                  <FaUser className="text-2xl" />
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* main*/}
        <main className="container mx-auto px-4 py-8">
          {view === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex-1 hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => 
                          favorites.some(f => f.id === product.id)
                            ? removeFromFavorites(product.id)
                            : addToFavorites(product)
                        }
                        className={`p-2 rounded ${
                          favorites.some(f => f.id === product.id) 
                            ? 'text-red-500 bg-red-100' 
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <FaHeart className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          

          {view === 'cart' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-black">Shopping Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-black">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-4 text-black">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={item.image}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                              className="rounded"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-black">{item.name}</h4>
                            <p className="text-gray-500 text-black">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-gray-200 px-3 py-1 rounded"
                            >
                              -
                            </button>
                            <span className="text-black">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-gray-200 px-3 py-1 rounded"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-black">Total: ${totalPrice.toFixed(2)}</p>
                    <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

         
          
  {view === 'favorites' && (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-black">Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites added</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <div className="relative h-32 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h4 className="font-semibold text-black">{product.name}</h4>
              <div className="flex justify-between items-center mt-2">
                <p className="text-black">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
  {view === 'auth' && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-black">
          {authMode === 'login' ? 'Sign In' : 'Register'}
        </h2>
        
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block mb-2 text-black">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                className="w-full p-2 border rounded"
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
              />
            </div>
          )}
          
          <div>
            <label className="block mb-2 text-black">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                email: e.target.value
              }))}
            />
          </div>
          
          <div>
            <label className="block mb-2 text-black">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                password: e.target.value
              }))}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              {authMode === 'login' ? 'Sign In' : 'Register'}
            </button>
            
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            >
              {authMode === 'login' 
                ? 'Need an account? Register' 
                : 'Already have an account? Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
        </main>
      </div>
    </AppContext.Provider>
  );
}