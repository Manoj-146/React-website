// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginModal from './components/LoginModal';
import ProductList from './components/ProductList';
import SearchForm from './components/SearchForm';
import './App.css'
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import OrderPage from './components/OrderPage';
import PaymentComponent from './components/PaymentComponent';




const App = () => {
  const [loggedIn, setLoggedIn] = useState(()=>{
    const storedState = localStorage.getItem('loggedin');
    return storedState ? JSON.parse(storedState) : false; 
  });
  const [isAdmin, setIsAdmin] = useState(()=>{
    const storedState = localStorage.getItem('isadmin');
    return storedState ? JSON.parse(storedState) : false; 
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [products, setProducts] =useState([]);
  const [displayproducts, setDisplayedProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [buyNowProducts, setBuyNowProducts] = useState([]);

 useEffect(()=>{
  localStorage.setItem('loggedin', JSON.stringify(loggedIn));
  localStorage.setItem('isadmin', JSON.stringify(isAdmin));
 })

const addToCart = (product) => {
  const maxQuantity = 5;
  setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
          if (existingProduct.quantity < maxQuantity) {
              return prevCart.map(item =>
                  item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              );
          } else {
              alert(`You can only buy a maximum of ${maxQuantity} units of this product.`);
              return prevCart;
          }
      } else {
          return [...prevCart, { ...product, quantity: 1 }];
      }
  });
};


 const handleSearch=(query)=>{

  if(query.trim() ===''){
    setDisplayedProducts(products);
  }
  else{
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));    
    setDisplayedProducts(filteredProducts);
  }
 }

  const handleLogin = async (username,password) => {
    if (username === 'admin@gmail.com' && password === 'admin') {
        console.log('Admin login successful');
        setIsAdmin(true);
        setLoggedIn(true);
        localStorage.setItem('myState', JSON.stringify(loggedIn));
        localStorage.setItem('isadmin', JSON.stringify(isAdmin));
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        setLoggedIn(true);
        localStorage.setItem('myState', JSON.stringify(loggedIn));
        console.log('Login successful:', data);
        alert(`Login successful:${username}`); 
    } catch (error) {
        alert(`Login failed: ${error.message}`);
    }
  };


  const handleSignup = async (username, password) => {
    console.log('Signing up with username:', username, 'and password:', password);
    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        alert(`${username} Signup successful!`);
      } else {
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert("An error occurred during signup. Please try again.");
    }
  };


  const handlelogout=()=>{
    setLoggedIn(false);
    localStorage.setItem('myState', JSON.stringify(loggedIn));
    setIsAdmin(false);
    localStorage.setItem('isadmin', JSON.stringify(isAdmin));
  }

  const setProductvalues=(data)=>{
    setProducts(data);
    setDisplayedProducts(data);
  }
  
  return (
      <div>
        <NavBar loggedIn={loggedIn}  onLogin={() => setShowLoginModal(true)} onLogout={handlelogout} />
        <SearchForm handleSearch={handleSearch}/>
        <Routes>
          <Route path='/cart' element={<Cart setBuyNowProducts={setBuyNowProducts} cart={cart} setCart={setCart} />} />
          <Route path="/" element={<ProductList addToCart={addToCart}  isAdmin={isAdmin} products={displayproducts} loggedIn={loggedIn} setProducts={setProductvalues}/>} />
          <Route path="/product/:id" element={<ProductDetail  setBuyNowProducts={setBuyNowProducts} loggedIn={loggedIn} products={products} addToCart={addToCart} />} />
          <Route path="/order" element={<OrderPage buyNowProducts={buyNowProducts} products={buyNowProducts}/>} />
          <Route path="/payment" element={<PaymentComponent  buyNowProducts={buyNowProducts} />} />
        </Routes>
        {showLoginModal && <LoginModal  onClose={() => setShowLoginModal(false)} onLogin={handleLogin} onSignup={handleSignup}/>}
        <Footer/>
      </div>
  )
};

export default App;
