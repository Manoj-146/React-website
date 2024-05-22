import React, { useState, useEffect } from 'react';
import Product from './Product';

const ProductList = ({addToCart,setProducts, products, loggedIn, isAdmin }) => {
  // const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price:0, imagePath : null }); // State to hold the new product data
  const [showAddForm, setShowAddForm] = useState(false); // State to control the display of the add product form

   useEffect(() => {  
    fetchProducts();
  }, []);

  //Read
  const fetchProducts = async () => {
    try {
      
      const response = await fetch('http://localhost:8080/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) 
    {
       console.log(error);
    }
  };

  //Update
  const updateProduct = async (id, updatedProduct) => {
    try {
      const formData = new FormData();
      formData.append('name', updatedProduct.name);
      formData.append('description', updatedProduct.description);
      formData.append('price', updatedProduct.price);
      if(updatedProduct.imagePath){
      formData.append('imagePath', updatedProduct.imagePath);
      }
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      setTimeout(fetchProducts, 500);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  //Delete
  const handleDelete = async (id) => {
    try{
      const response= await fetch(`http://localhost:8080/products/${id}`,{
        method : 'DELETE',
      });
      if(!response.ok){
        throw new Error("Product has not deleted");
      }
      setProducts(products.filter(product => product.id !== id));      
    }catch(err){
      console.log(err);
    }
  }


  //Add
  const handleAddProduct= async(e)=>{
    try{
      const formdata=new FormData();
      formdata.append('name',newProduct.name)
      formdata.append('description',newProduct.description);
      formdata.append('price',newProduct.price);
      formdata.append('imagePath',newProduct.imagePath);

      const response=await fetch('http://localhost:8080/products',{
        method:'POST',
        body:formdata,
      });

      if(response.ok){
        console.log(response);
      }
      else{
        throw new Error('Failed to add product');
      }
      setNewProduct({name: '', description: '', price: '', imagePath: null,});
      setTimeout(fetchProducts, 1000);
    }
    catch(err){
      console.error(err);
    }
  }
 
  // const handleEdit = (product) => {
  //   setEditingProduct(product);
  // };

  // const handleSave = () => {
  //   if (!editingProduct) {
  //     setEditingProduct(null);
  //     return;
  //   }
  //   setEditingProduct(null);
  //   updateProduct(editingProduct.id, editingProduct); // Update products db directly
  // };

  // const handleCancelEdit = () => {
  //   setEditingProduct(null);
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditingProduct(prevProduct => ({
  //     ...prevProduct,
  //     [name]: value
  //   }));
  // };

  // const handleImageChange = (event) => {
  //   const imageFile = event.target.files[0];
  //   setEditingProduct(prevProduct => ({
  //     ...prevProduct,
  //     imagePath: imageFile
  //   }));
  // };

  const handleNewImageChange = (event) => {
    const imageFile = event.target.files[0];
    setNewProduct(prevProduct => ({
      ...prevProduct,
      imagePath: imageFile
    }));
  };

  // const getImagePath = (filePath) => {
  //   if (filePath !== null) {
  //     const segments = filePath.split('\\');
  //     const fileName = segments[segments.length - 1];
  //     if (fileName) {
  //       const imagePath = require(`../media/${fileName}`);
  //       return imagePath;
  //     }
  //   }
  // };

  const cancelAddItem =()=>{
    setShowAddForm(false);
    setNewProduct({name: '', description: '', price: '', imagePath: null,});
  }
  
  return (
    <div className='product-container'>
      {showAddForm && isAdmin &&
      <div className='modal-overlay'>
        <div className='form-container'>
          <h2 style={{textAlign:"center"}}>New Item</h2>
          <input className='form-input-container' type='text' name='name' placeholder='name' value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}/>
          <input className='form-input-container' type='text' name='description' placeholder='Description' value={newProduct.description} onChange={(e)=>setNewProduct({...newProduct,description:e.target.value})}/>
          <input className='form-input-container' type='number' name='price' placeholder='Price' value={newProduct.price} onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}/>
          <input type="file" accept="image/*" onChange={handleNewImageChange} />
          <div style={{textAlign:'center'}}>
            <button onClick={cancelAddItem} style={{backgroundColor:'red'}}>Cancel</button>
            <button style={{backgroundColor:'Green'}} onClick={handleAddProduct}>Save</button>
          </div>
        </div>
      </div>}

      {isAdmin && loggedIn &&
      <div className='add-btn-container'>
        <h1>Hey Admin, You can add the Item here!</h1>
        <button className='add-btn' onClick={()=>setShowAddForm(true)}> Add</button>
      </div>}
      {products.map(product => (
        <Product addToCart={addToCart} product={product} loggedIn={loggedIn} isAdmin={isAdmin} updateProduct={updateProduct} handleDelete={handleDelete} />
      //   <div className='product' key={product.id}>
      //   <img src={getImagePath(product.imagePath)} accept="image/*" alt={product.name} style={{ maxWidth: '200px' }} />
      //   <h3>{product.name}</h3>
      //   <p> Product Description : {product.description} </p>
      //   <p>Price: &#8377; {product.price}</p>
      //   {loggedIn && isAdmin ? (
      //     editingProduct && editingProduct.id === product.id ? (
      //       <div className='edit-div'>
      //         <h3>Image:</h3> <input type="file" accept="image/*" onChange={handleImageChange} />
      //         <h3>Item name:</h3> <input type="text" name="name" value={editingProduct.name} onChange={handleInputChange} />
      //         <h3>Description:</h3> <input type="text" name="description" value={editingProduct.description} onChange={handleInputChange} />
      //         <h3>Price:</h3> <input type="number" name="price" value={editingProduct.price} onChange={handleInputChange} />
      //         <button onClick={handleCancelEdit} className='update-btns' style={{backgroundColor:'red'}}>Cancel</button>
      //         <button onClick={handleSave} style={{backgroundColor:'green'}} className='update-btns'>Save</button>
      //       </div>
      //     ) : (
      //       <div className='crud-container'> 
      //         <button className='edit-btn' onClick={() => handleEdit(product)}>Edit</button>
      //         <button className='delete-btn' onClick={() => handleDelete(product.id)}>Delete</button>
      //       </div>
      //     )
      //   ) : (
      //     <button className='Buynow-btn'>Buy Now</button>
      //   )}
      // </div>
      ))}
    </div>
  );
};

export default ProductList;
