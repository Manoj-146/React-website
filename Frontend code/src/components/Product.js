import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


const Product = ({product, loggedIn, isAdmin, updateProduct, handleDelete, setBuyNowProducts}) => {

  const [editingProduct, setEditingProduct] = useState(null);
  // const navigate = useNavigate();

  // const handleBuyNow = (product) => {
  //   setBuyNowProducts([{ ...product, quantity: 1 }]);
  //   navigate('/order');
  // };



  
  //For Editing(Update)
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSave = () => {
    if (!editingProduct) {
      setEditingProduct(null);
      return;
    }
    setEditingProduct(null);
    updateProduct(editingProduct.id, editingProduct); // Update products db directly
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setEditingProduct(prevProduct => ({
      ...prevProduct,
      imagePath: imageFile
    }));
  };
  //Editing end

  //Read
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
  //Read End

  return (
    <div className='product' key={product.id}>
          <div style={{height:'45%', width:"100%"}}>
            <img src={getImagePath(product.imagePath)} accept="image/*" alt={product.name} style={{ maxWidth: '100%',maxHeight:'100%' }} />
          </div>
        <Link style={{textDecoration:'none'}} to={`/product/${product.id}`}>
          <h4 style={{margin:'0px'}}>{product.name}</h4>
        </Link>
        <h3 style={{margin:'0px'}}>Price: &#8377; {product.price}</h3>
        {loggedIn && isAdmin ? (
          editingProduct && editingProduct.id === product.id ? (
            <div className='edit-div'>
              <h3>Image:</h3> <input type="file" accept="image/*" onChange={handleImageChange} />
              <h3>Item name:</h3> <input type="text" name="name" value={editingProduct.name} onChange={handleInputChange} />
              <h3>Description:</h3> <input type="text" name="description" value={editingProduct.description} onChange={handleInputChange} />
              <h3>Price:</h3> <input type="number" name="price" value={editingProduct.price} onChange={handleInputChange} />
              <button onClick={handleCancelEdit} className='update-btns' style={{backgroundColor:'red'}}>Cancel</button>
              <button onClick={handleSave} style={{backgroundColor:'green'}} className='update-btns'>Save</button>
            </div>
          ) : 
          (
            <div className='crud-container'> 
                <button className='edit-btn' onClick={() => handleEdit(product)}>Edit</button>
                <button className='delete-btn' onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
            )
        ) : (
          // <div>
          //   {loggedIn && !isAdmin && <button className='Buynow-btn'onClick={() => handleBuyNow(product)}>Buy Now</button>}
          //   {loggedIn && !isAdmin && <button className='Buynow-btn' style={{backgroundColor:'orange'}} onClick={()=>addToCart(product)}>Cart+</button>}
          // </div>
          <></>
        )}
    </div>
  )
}

export default Product