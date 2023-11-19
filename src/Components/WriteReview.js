import React, { useState } from 'react';
import bg from "../Images/BackGround.svg"
import logo from "../Images/logo.svg"
import "../css/WriteReview.css";
import { Link, useParams } from "react-router-dom";

import GiveRating from "./GiveRating";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const WriteReview = () => {
    const navigate = useNavigate();
    const location=useLocation();
const productN=location.state.productN;
const productName=location.state.productName;
const id1=location.state.id1;
const image=location.state.image;
const name=location.state.name;
  const [review, setReview] = useState(0);
 const [ReviewText,setReviewText] = useState('');
  const [ReviewTitle,setReviewTitle] = useState('');
  const [arr,setArr] = useState([]);
  const [arr2,setArr2] = useState([]);
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
    Axios.get("https://mern-back-2pn7.onrender.com/product/login1")
      .then((res)=>{
          if(res.status === 200){
              setArr2(res.data);
          }
          else
              Promise.reject();
      })
      .catch((err)=>alert(err));
},[])
console.log(arr);
const productsData=arr;

  const ProductName = productName.toLowerCase();
  const matchingProduct = productsData.filter(
    (product) => product.name.toLowerCase() === ProductName
  );

  if (matchingProduct.length === 0) {
    return <p>No such products found for this category</p>;
  }
const id22=matchingProduct[0]._id;
console.log(id22,"id22");

 console.log(arr2);
 let index1=0;
 let index2=0;
 arr2.forEach((element, index) => {
  if (element._id ===id1) {
    console.log(`Found element with id ${id1} at index ${index}`);
    index1=`${index}`;
    // You can perform additional actions here if needed
  }
});
arr.forEach((element, index) => {
    if (element._id ===id22) {
      console.log(`Found element with id ${id22} at index ${index}`);
      index2=`${index}`;
      // You can perform additional actions here if needed
    }
  });
//   star rating review count
  console.log(review);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = {review:review, ReviewText: ReviewText, ReviewTitle: ReviewTitle,ReviewUserName:arr2[index1].name,ReviewUserCountry:arr2[index1].country,product_name:arr[index2].name};
    Axios.put("https://mern-back-2pn7.onrender.com/product/edit-product/" + id22 , newObj)
    .then((res)=>{
        if(res.status === 200){
            alert("Record updated successfully");
        }
        else{
            Promise.reject();
        }
    })
    .catch((err)=>alert(err));
    Axios.put("https://mern-back-2pn7.onrender.com/product/edit-login/" + id1 , newObj)
    .then((res)=>{
        if(res.status === 200){
            alert("Record updated successfully");
        }
        else{
            Promise.reject();
        }
    })
    .catch((err)=>alert(err));
}
  const handleChange = (newReview) => {
    setReview(newReview);
  };


    return ( 
        <div>
 <img src={bg} width="100%" className="bg-image" />
      <div className="main writeReview">
        <nav>
        <div onClick={()=>{ navigate('/dashboard',{replace:true,state:{id1:id1}});}}>
          <img src={logo} alt="Logo" className="logo"/>
          </div>
        </nav>
            {/* redirect */}
        <div className="redirect">
        <div onClick={()=>{ navigate('/main-categories',{replace:true,state:{id1:id1,image:image,name:name}});}}>
          
          <p>Categories</p>
          <hr></hr>
      </div>
          <p> {">"}</p>
          <div onClick={()=>{ navigate('/product',{replace:true,state:{productN:productN,id2:id1,image:image,name:name}});}}>
            <p>{productN}</p>
            <hr></hr>
            </div>
          <p> {">"}</p>
          <div onClick={()=>{navigate('/product-review',{replace:true,state:{productN: productN,
              productR: productName,id2:id1,name:name,image:image}});}}>
          <p>{productName}</p>
          <hr></hr>
          </div>
          <p> {">"}</p>
          <div onClick={()=>navigate('/write-review',{replace:true,state:{ productN: productN,
                      productName: productName,id1:id1,image:image,name:name}})}>
          
          <p>Review</p>
          <hr></hr>
          </div>
        </div>

        <div >
            {matchingProduct.map((product)=>(
                <div key={product._id} className="review-box">
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={product.images[0]} className="product-img" />
                    <div>
                    <h2> {product.name}</h2>
                   <GiveRating onReviewChange={handleChange} />
                   </div>


                </div>
                   <h4>Tell us about your experience</h4>
                   <form>
                   <textarea
        placeholder="What made your experience great? Remember to be polite and humble."
        onChange={(e) => setReviewText(e.target.value)}
      />
       <h4>Give title to your review.</h4>
       <input type='text' placeholder='Keep it short.' onChange={(e) => setReviewTitle(e.target.value)}/>
       <button className="Review-button " onClick={handleSubmit}><div className="btn-circle1"></div><span>Review it</span><div className="btn-circle2" ></div></button>
       
                   </form>
                </div>
            ))}
        </div>
      </div>
        </div>
     );
}
export default WriteReview;