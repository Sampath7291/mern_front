import "../css/MyReviews.css";
import bg from "../Images/BackGround.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../Images/logo.svg";
import locationImg from "../Images/location.svg";
import StarRating from "./StarRating";
import { useLocation,useNavigate } from "react-router-dom";
import Axios from "axios";
import Footer from "./Footer";
import {useEffect} from "react";
import profileImg from "../Images/profile-img.png";
import search from "../Images/searchicon.svg"
const MyReviews = () => {
  const onChange=async(e)=>{
    setValue(e.target.value);
    const response=await fetch('https://mern-back-2pn7.onrender.com/product');
    const data=await response.json()
    setData1(data);
    navigate('/myreviews',{replace:true,state:{id2:id2,image:profile,name:name}});
  }
  const [value,setValue]=useState();
  const [data1,setData1]=useState([])
    const navigate=useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const location=useLocation();
  const profile=location.state.image;
  const name=location.state.name;
  const id2=location.state.id2;
  const userName = name.toLowerCase();
  const [arr1,setArr1] = useState([]);

  useEffect(()=>{
    Axios.get("https://mern-back-2pn7.onrender.com/product/login1")
    .then((res)=>{
        if(res.status === 200){
            console.log(res.data);
            setArr1(res.data);
        }
        else
            Promise.reject();
    })
    .catch((err)=>alert(err));
},[])
console.log(arr1);
  const matchingUser = arr1.filter(
    (user) => user.name.toLowerCase() === userName
  );
const country=matchingUser.country;
  if (matchingUser.length === 0) {
    return <p>No such products found for this category</p>;
  }
  console.log(matchingUser);
  const productNamesArray = arr1.map((item) => item.product_name);

  console.log(productNamesArray);

  return (
    <div>
      <img src={bg} width="100%" className="bg-image" />
      <div className="main MyReview">
        {/* nav */}
        <nav>
        <div onClick={()=>{ navigate('/dashboard',{replace:true,state:{id1:id2}});}}>
          <img src={logo} alt="Logo" className="logo"/>
          </div>
          <form className="product-search">
                
               
                <img src={search}/>
                      <input type="text" placeholder="Search for any product..." className="product-search" onChange={onChange} value={value} />
                     
                     <button className="search-btn"  style={{display:"none"}}
                     onClick={()=>{ navigate('/product-review1',{replace:true,state:{productN:value,id2:id2,image:profile,name:name}});}}
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
            <img src={profile} alt="Profile" style={{borderRadius:"100%"}}/>
            <p>{name}</p>
          </div>
          <div
            className={`profile-dropdown ${isDropdownVisible ? "show" : ""}`}
          >
            <div onClick={()=>navigate('/profile',{replace:true,state:{id1:id2}})}>
              <li>Edit profile</li>
            </div>
            <div onClick={()=>navigate('/myreviews',{replace:true,state:{id2:id2,image:profile,name:name}})}>
              <li>My reviews</li>
            </div>
            <li className="logout"  onClick={()=>navigate('/')} >Log out</li>
          </div>
        </nav>
        <div className="Myrev-prof">
          <img src={profile} />
          <div>
            <h5>{name}</h5>
            <p>{country}</p>
          </div>
        </div>
        <h2>My reviews</h2>
        <div>
          {matchingUser.map((user, index) => (
            <div key={index}>
              {user.product_name.map((productName, i) => (
                <div key={i}>
                  <h4 style={{ marginTop: '80px' }}>You reviewed {user.product_name[i]}</h4>
                  <div className="review-card">
                    <div className="review-profile">
                      <img src={profile} className="reviewProfile-img" style={{borderRadius:"100%"}} />
                      <div>
                        <p>{user.name}</p>
                        <div className="reviewc-loctaion">
                          <img src={locationImg} />
                          <span>{user.country}</span>
                        </div>
                      </div>
                    </div>
                    <hr className="hr1" />
                    <StarRating averageRating={user.rating[i]} />
                    <h4 className="review-title">{user.revietitle[i]}</h4>
                    <p className="review-text">{user.reviewtext[i]}</p>
                    <p className="review-date">
                      Date of experience:{" "}
                      <span>
                        {new Date(user.reviewdate[i]).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MyReviews;
