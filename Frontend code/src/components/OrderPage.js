// // OrderPage.js
// import React from 'react';

// const OrderPage = ({ products }) => {

//   const navigate = useNavigate();

//   const handleProceedToPayment = () => {
//     navigate('/payment');
//   };

//     const getImagePath = (filePath) => {
//         if (filePath !== null) {
//           const segments = filePath.split('\\');
//           const fileName = segments[segments.length - 1];
//           if (fileName) {
//             const imagePath = require(`../media/${fileName}`);
//             return imagePath;
//           }
//         }
//       };



//   return (
//     <div className="order-page" style={{marginBottom:"110px"}}>
//       <h1>Order Summary</h1>
//       {products.length === 0 ? (
//         <p>No products to display</p>
//       ) : (
//         <div>
//           {products.map(product => (
//             <div style={{display:"flex", flexDirection:"row"}} key={product.id} className="order-item">
//               <img style={{width:"20%"}} src={getImagePath(product.imagePath)} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>${product.price}</p>
//               <p>Quantity: {product.quantity}</p>
//             </div>
//           ))}
//           <button style={{padding:"10px 20px", backgroundColor:"green", borderRadius:"5px", outline:"none", outline:"none"}} onClick={handleProceedToPayment}>Order</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderPage;


// OrderPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPage = ({ buyNowProducts }) => {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div>
      <h2>Order Detail</h2>
      <ul>
        {buyNowProducts.map(product => (
          <li key={product.id}>{product.name} - &#8377; {product.price}</li>
        ))}
      </ul>
      <button onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderPage;
