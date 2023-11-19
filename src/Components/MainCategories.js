import React from "react";
import Footer from "./Footer";
import Axios from "axios";
import {useEffect, useState} from "react";
import "../css/Maincategories.css";
import bg from "../Images/BackGround.svg";
import logo from "../Images/logo.svg";
import Smartphone from "../Images/Smartphone.svg";
import automotives from "../Images/automotives.svg"
import bags from "../Images/bags.svg"
import fragrances from "../Images/fragrances.svg"
import furniture from "../Images/furniture.svg"
import groceries from "../Images/groceries.svg"
import homedecor from "../Images/homedecor.svg"
import jewellery from "../Images/jewellery.svg"
import laptop from "../Images/laptops.svg"
import light from "../Images/light.svg"
import sunglasses from "../Images/sunglasses.svg"
import watches from "../Images/watches.svg"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import search from "../Images/searchicon.svg"
const MainCategories = () => {
  const navigate = useNavigate();
  const location=useLocation();
  
  const id1=location.state.id1;
  const image=location.state.image;
  const name=location.state.name;
  const id2=id1;
  const [value,setValue]=useState();
  const [data1,setData1]=useState([])
  const onChange=async(e)=>{
    setValue(e.target.value);
    const response=await fetch('https://mern-back-2pn7.onrender.com/product');
    const data=await response.json()
    setData1(data);
    navigate('/main-categories',{replace:true,state:{id1:id2,image:image,name:name}});
  }
  
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const productImages = [
    {
      id: 1,
      images: [automotives],
    },
    {
      id: 2,
      images: [fragrances],
    },
    {
      id: 3,
      images: [furniture],
    },
    {
      id: 4,
      images: [groceries],
    },
    {
      id: 5,
      images: [homedecor],
    },
    {
      id: 6,
      images: [light],
    },
    {
      id: 7,
      images: [laptop],
    },
    {
      id: 8,
      images: [Smartphone],
    },
    {
      id: 9,
      images: [sunglasses],
    },
    {
      id: 10,
      images: [watches],
    },
    {
      id: 11,
      images: [bags],
    },
    {
      id: 12,
      images: [jewellery],
    },
  ];
  const [arr,setArr] = useState([]);
  useEffect(()=>{
    Axios.get("https://mern-back-2pn7.onrender.com/product/cat")
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
const products=arr;

// useEffect(() => {
//   const handleBeforeUnload = (event) => {
//     event.preventDefault();
//     navigate('/dashboard', { replace: true, state: { id1: id1 } });
//     console.log('Back button clicked!');
//   };

//   window.addEventListener('beforeunload', handleBeforeUnload);

//   return () => {
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//   };
// }, [id1, navigate]);
  return (
    <div>
      <img src={bg} width="100%" className="bg-image" />
      <div className="Mcategories main">
        <nav>
        <div onClick={()=>{ navigate('/dashboard',{replace:true,state:{id1:id1}});}}>
          <img src={logo} alt="Logo" className="logo"/>
          </div>
          <form className="product-search">
                
               
          <img src={search}/>
                <input type="text" placeholder="Search for any product..." className="product-search" onChange={onChange} value={value} />
               
               <button className="search-btn"  style={{display:"none"}}
               onClick={()=>{ navigate('/product-review1',{replace:true,state:{productN:value,id2:id1,image:image,name:name}});}}
               >Search</button>
              
              <div className='dropdown-content'>
                {
                 value &&
                  data1.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()))
                  .map(item=> <div key={item._id} onClick={(e)=>setValue(item.name)}>
                    {item.name}
                    <hr></hr>
                  </div>)
                }
               </div>
               
              
              
              </form>

<div className="profile" onClick={toggleDropdown}>
            <img src={image} alt="Profile" style={{borderRadius:"100%"}} />
            <p>{name}</p>
          </div>
          <div
            className={`profile-dropdown ${isDropdownVisible ? "show" : ""}`}
          >
            <div onClick={()=>navigate('/profile',{replace:true,state:{id1:id2}})}>
              <li>Edit profile</li>
            </div>
            <div onClick={()=>navigate('/myreviews',{replace:true,state:{id2:id1,image:image,name:name}})}>
              <li>My reviews</li>
            </div>
            <div onClick={()=>navigate('/')}>
            <li className="logout">Log out</li>
            </div>
          </div>
        </nav>
        <div className="redirect">
          <div>
          <p>Categories</p>
          <hr></hr>
          </div>
         
        </div>
        <h3>What are you looking for?</h3>

        <div className="c-boxes logo" >
          {products.map((product, index) => (
           <div  key={product._id} onClick={()=>{ navigate('/product',{replace:true,state:{productN:`${product.category}`,id2:id2,name:name,image:image}});}}>
    
              <div className="c-details" key={product.id}>
                {Array.isArray(productImages[index]?.images) ? (
                  productImages[index].images.map((imageUrl, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={imageUrl}
                      alt={`Product ${imageIndex + 1}`}
                    />
                  ))
                ) : (
                  <p>No images available for this product.</p>
                )}
                <h5>{product.category}</h5>
                <hr />
                <p>{product.product1}</p>
                <p>{product.product2}</p>
                <p>{product.product3}</p>
                <p>{product.product4}</p>
                <p>{product.product5}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MainCategories;
