import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const ProductDetail = ({loggedIn, products, addToCart, setBuyNowProducts }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));


    const navigate = useNavigate();

    const handleBuyNow = () => {
      setBuyNowProducts([product]);
      navigate('/order');
    };
    

    if (!product) {
        return <p>Product not found</p>;
    }

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
    return (
        <div className='productDetails-container' style={{height: '80vh'}}>
            <div style={{width:"40%" ,padding:'50px 0px'}}>
                <img src={getImagePath(product.imagePath)} accept="image/*" alt={product.name} style={{ maxWidth: '100%',maxHeight:'100%' }} />
            </div>
            <div style={{padding: "10px 0px",width: "50%",display: "flex",flexDirection: "column"}}>
                <h3 style={{lineHeight: "25px"}}>{product.name}</h3>
                <div style={{padding:"30px 0px"}}>
                    <h4 style={{margin:'10px 0px'}}>About this item</h4>
                    <p>{product.description}</p>
                </div>
            </div>
            <div style={{display:'flex', flexDirection:"column", justifyContent:"center", padding:"10px 20px", width:"20%" } }>
                <h3 style={{textAlign:'center'}} >Price: &#8377; {product.price}</h3>
                {loggedIn && <button className='btn' style={{backgroundColor:"#ffa500b8"}} onClick={() => addToCart(product)}>Add to Cart</button>}
                <button className='btn' onClick={handleBuyNow} >Buy Now</button>
            </div>
        </div>
    );
};

export default ProductDetail;
