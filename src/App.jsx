import { useState, useEffect } from 'react';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import CartSidebar from './Components/CartSidebar';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Endpoint MockAPI Siswa
  const API_URL = "https://69835edb9c3efeb892a5872f.mockapi.io/products";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error("Error ambil data:", err));
  }, []);

  // Fitur: Tambah ke Keranjang (Cek Duplikat)
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, {...product, qty: 1}];
    });
    setIsCartOpen(true);
  };

  // Fitur: Update Qty (+/-)
  const updateQty = (id, change) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + change }
          : item
      )
      .filter((item) => item.qty > 0)
  );
};

  // Fitur: Hapus Item
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Header 
        cartCount={cart.reduce((a, c) => a + c.qty, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        closeCart={() => setIsCartOpen(false)} 
        cartItems={cart} 
        updateQty={updateQty} 
        removeItem={removeItem} 
      />

      <main className="container">
        <h1 className="hero-title">Kirana nub :p</h1>
        {loading ? <p style={{textAlign:'center'}}>⏳ Loading Page...</p> : 
          <ProductList products={products} onAddToCart={addToCart} />
        }
      </main>
    </>
  );
}

export default App;
