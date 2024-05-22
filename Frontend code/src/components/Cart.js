import React from 'react';
import { useNavigate } from 'react-router-dom';


const Cart = ({cart, setCart, setBuyNowProducts}) => {
    const maxQuantity = 5;

    const navigate = useNavigate();

    const handleBuyNow = () => {
      setBuyNowProducts(cart);
      navigate('/order');
    };


const getImagePath = (filePath) => {
    if (filePath !== null) {
      const segments = filePath.split('\\');
      const fileName = segments[segments.length - 1];
      if (fileName) {
        const imagePath = require(`../media/${fileName}`);
        return imagePath;
      }
    }
  };

  const removeFromCart=(product)=>{
    const updatedCart=cart.filter(c=> c.id !== product.id)
    setCart(updatedCart);
  }

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => {
        return prevCart.map(item =>
            item.id === productId ? { ...item, quantity: Math.min(quantity, maxQuantity) } : item
        );
    });
};



return (
    <div className='cart-container'>
        {cart.length === 0 ? (
            <p>Your cart is empty</p>
        ) : (
            <>
            {cart.map((product, index) => (
                <div key={index} className='cart-item'>
                    <img src={getImagePath(product.imagePath)} accept="image/*" alt={product.name} />
                    <h2>{product.name}</h2>
                    <div className='quanity-container'>
                        <p>quantity : {product.quantity}</p>
                        <div>
                        <button className='btn' style={{borderRadius: "5px 0px 0px 5px"}} onClick={() => updateQuantity(product.id, product.quantity - 1)} disabled={product.quantity <= 1}>-</button>
                        <button className='btn' style={{borderRadius: "0px 5px 5px 0px"}} onClick={() => updateQuantity(product.id, product.quantity + 1)} disabled={product.quantity >= 5}>+</button>
                        </div>
                    </div>
                    <div style={{textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", margin:"10px"}}>
                        <button style={{backgroundColor:"red",fontWeight: "600", color:"white",padding: "7px 10px", borderRadius: "5px", border: "1px solid hsl(0deg 0% 80% / 50%)", cursor:"pointer"}}   onClick={()=>removeFromCart(product)}>Remove</button>
                    </div>
                </div>
            ))}
            <div>
                <button onClick={handleBuyNow}>Buy now</button>
            </div>
            </>
        )}
    </div>
);
}

export default Cart