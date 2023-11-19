import "../css/ProductReview.css";
import bg from "../Images/BackGround.svg";
import { Link, useParams } from "react-router-dom";
import logo from "../Images/logo.svg";
import profile from "../Images/profile-img.png";
import arrowout from "../Images/arrowout.svg";
// import productsData from "./productsData.json";
import StarRating from "./StarRating";
import search from "../Images/searchicon.svg"
import RatingBars from "./RatingBars";
import ReviewCard from "./ReviewCard";
import Axios from "axios";
import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
const ProductReview = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const productN=location.state.productN;
  const productR=location.state.productR;
  const id2=location.state.id2;
  const image=location.state.image;
  const name=location.state.name;
  const ProductName = productR.toLowerCase();
  const [value,setValue]=useState();
  const [data1,setData1]=useState([])
  const onChange=async(e)=>{
    setValue(e.target.value);
    const response=await fetch('https://mern-back-2pn7.onrender.com/product');
    const data=await response.json()
    setData1(data);
    navigate('/product-review',{replace:true,state:{productN: productN,
      productR: productR,id2:id2,name:name,image:image}})
  }
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
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
  const matchingProduct = productsData.filter(
    (product) => product.name.toLowerCase() === ProductName
  );

  if (matchingProduct.length === 0) {
    return <p>No such products found for this category</p>;
  }

  return (
    <div>
      <img src={bg} width="100%" className="bg-image" />
      <div className="main productReview">
        {/* nav */}
        <nav>
        <div onClick={()=>{ navigate('/dashboard',{replace:true,state:{id1:id2}});}}>
          <img src={logo} alt="Logo" className="logo"/>
          </div>
          <form className="product-search">
                
               
                <img src={search}/>
                      <input type="text" placeholder="Search for any product..." className="product-search" onChange={onChange} value={value} />
                     
                     <button className="search-btn"  style={{display:"none"}}
                     onClick={()=>{ navigate('/product-review1',{replace:true,state:{productN:value,id2:id2,image:image,name:name}});}}
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
            <img src={image} alt="Profile" style={{borderRadius:"100%"}}/>
            <p>{name}</p>
          </div>
          <div
            className={`profile-dropdown ${isDropdownVisible ? "show" : ""}`}
          >
            <div onClick={()=>navigate('/profile',{replace:true,state:{id1:id2}})}>
              <li>Edit profile</li>
            </div>
            <div onClick={()=>navigate('/myreviews',{replace:true,state:{id2:id2,image:image,name:name}})}>
              <li>My reviews</li>
            </div>
            <div onClick={()=>navigate('/')}>
            <li className="logout">Log out</li>
            </div>
          </div>
        </nav>
        {/* redirect to back */}
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
          <div>
          <p>{productR}</p>
          <hr></hr>
          </div>
        </div>

        {/* product details */}
        {matchingProduct.map((product) => (
          <div key={product._id} className="product-details">
            <div className="Main-pdetails">
              <div style={{ display: "flex", alignItems: "center" }}>
              <div onClick={()=>{ navigate('/product-images',{replace:true,state:{ productN: productN,
                      productName: product.name,id2:id2,image:image,name:name}});}}>
                
                  <img src={product.images[0]} className="product-img logo" />
                </div>

                <div className="product-info">
                  <h2> {product.name}</h2>
                  <h4>
                    Reviews {product.count} |{" "}
                    {getRatingLabel(calculateAverageRating(product.review))}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <StarRating
                      averageRating={calculateAverageRating(product.review)}
                    />
                    <h5> {calculateAverageRating(product.review)}</h5>
                  </div>
                </div>
              </div>
              <div className="product-link">
                <img src={arrowout} />
                <a href={product.link} target="_blank">
                  Visit the official website
                </a>
              </div>
            </div>
            <div></div>
          </div>
        ))}

       {/* review btn */}
       {matchingProduct.map((product) => (
        <div key={product._id}  className="write-rev">
          <div className="profile">
            <img src={image} alt="Profile" style={{borderRadius:"100%",height:"60px",width:"60px"}}/>
            <p>{name}</p>
          </div>
          <div onClick={()=>navigate('/write-review',{replace:true,state:{ productN: productN,
                      productName: product.name,id1:id2,image:image,name:name}})}>
          
          <button className="writeRev-button "><div className="btn-circle1"></div><span>Review it</span><div className="btn-circle2" ></div></button>
          </div>
          
        </div>
))}
        {/* rating bars */}
        {matchingProduct.map((product) => (
          <RatingBars ratings={product.review} count={product.count} />
        ))}

        {/* review cards */}
        <ReviewCard reviews={matchingProduct} />
      </div>
      <Footer/>
    </div>
  );
};

// for finding averagerating
const calculateAverageRating = (ratings) => {
  const totalRatings = ratings.length;
  const sumRatings = ratings.reduce(
    (total, rating) => total + parseInt(rating),
    0
  );
  const averageRating = sumRatings / totalRatings;
  return isNaN(averageRating) ? 0 : averageRating.toFixed(2);
};

// for finding rating label
const getRatingLabel = (averageRating) => {
  if (averageRating >= 1 && averageRating < 2) {
    return "Poor";
  } else if (averageRating >= 2 && averageRating < 3) {
    return "Fair";
  } else if (averageRating >= 3 && averageRating < 4) {
    return "Good";
  } else if (averageRating >= 4 && averageRating < 5) {
    return "Better";
  } else if (averageRating === 5) {
    return "Excellent";
  } else {
    return "Not Rated";
  }
};

export default ProductReview;
{
  /* <img
              src={product.images[0]}
              alt="Product"
              className="product-Img"
            />
            <div>
              <h4> {product.name}</h4>
              <p>Reviews {product.count} | </p>
              <div style={{ display: "flex", alignItems: "center" }}></div>
            </div> */
}
