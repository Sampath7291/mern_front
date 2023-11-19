import React, { useState } from "react";
import "../css/ImageCarousel.css";
import { useParams } from "react-router-dom";
import bg from "../Images/BackGround.svg";
import { Link } from "react-router-dom";
import Axios from "axios";
import {useEffect} from "react";
import { useLocation,useNavigate} from "react-router-dom";
const ImageCarousel = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const productN=location.state.productN;
  const productName=location.state.productName;
  const id2=location.state.id2;
  const image=location.state.image;
  const name=location.state.name;
  const [arr,setArr] = useState([]);
  useEffect(()=>{
    Axios.get("https://mern-back-2pn7.onrender.com/product")
    .then((res)=>{
        if(res.status === 200){
            console.log(res.data);
            setArr(res.data);
        }
        else
            Promise.reject();
    })
    .catch((err)=>alert(err));
},[])
console.log(arr);
const productsData=arr;
  //   for finding matching products
  const matchingProduct = productsData.find(
    (product) =>
      product.name.toLowerCase() ===
      (productName ? productName.toLowerCase() : "")
  );
  // for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % matchingProduct.images.length
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? matchingProduct.images.length - 1 : prevIndex - 1
    );
  };

  if (!matchingProduct) {
    return <p>No such product found</p>;
  }

  return (
    <div>
      <img src={bg} width="100%" className="bg-image" />
      <div className="main icarousel">
        {/* redirect */}
        <div className="redirect">
        <div onClick={()=>{ navigate('/main-categories',{replace:true,state:{id1:id2,image:image,name:name}});}}>
          
          <p>Categories</p>
          <hr></hr>
      </div>
          <p> {">"}</p>
          <div onClick={()=>{ navigate('/product',{replace:true,state:{productN:productN,id2:id2,image:image,name:name}});}}>
          
            <p>{productN}</p>
            <hr></hr>
          </div>
          <p> {">"}</p>
          <div onClick={()=>{navigate('/product-review',{replace:true,state:{productN: productN,
              productR: productName,id2:id2,name:name,image:image}});}}>
          
            <p>{productName}</p>
            <hr></hr>
          </div>
          <p> {">"}</p>
          <div>
          
          <p>Images</p>
          <hr></hr>
          </div>
         
          
        </div>
        {/* carousel */}
        <div className="carousel-container">
          <div className="arrow left-arrow" onClick={prevImage}>
            {"<"}
          </div>
          <div className="carousel-images">
            <img
              src={matchingProduct.images[currentIndex]}
              alt={`Product ${currentIndex}`}
              className="c-image"
            />
          </div>
          <div className="arrow right-arrow" onClick={nextImage}>
            {">"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
