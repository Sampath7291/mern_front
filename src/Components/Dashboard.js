import React from "react";
import Navbar from "./Navbar";
import "../css/Home.css";
import search from "../Images/searchicon.svg"
import bg from "../Images/BackGround.svg";
import arrowRight from "../Images/Arrow-Right.svg";
import homeImg from "../Images/home-images.svg";
import shape1 from "../Images/Shape1.svg";
import shape2 from "../Images/Shape 2.svg";
import shape3 from "../Images/Shape 3.svg";
import Categories from "./Categories";
import Features from "./Features";
import Faq from "./Faq";
import Footer from "./Footer";
import profileImg from "../Images/profile-img.png";
import "../css/Dashboard.css"
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import About from "./About";
const Dashboard = () => {
  const navigate=useNavigate();
  const [value,setValue]=useState();
  const [data1,setData1]=useState([])
  const onChange=async(e)=>{
    setValue(e.target.value);
    const response=await fetch('https://mern-back-2pn7.onrender.com/product');
    const data=await response.json()
    setData1(data);
  }
  const location=useLocation();
  const id1=location.state.id1;
  
    const [data , setData] = useState({email:"",password:"",name:"",country:"",lang:"",image:""});
    Axios.post("https://mern-back-2pn7.onrender.com/product/update-profile/" + id1)
    .then((res)=>{
      const {email,password,name,country,lang,image} = res.data; 
      setData({email,password,name,country,lang,image})
    })
    .catch((err)=>console.log(err));
const name=data.name;
const img=data.image;
console.log(id1,"dashbord")
    return ( 
        <div>
        
            <img src={bg} className="bg-image" />
      <div className="main">
        {/* navbar */}
        <Navbar buttonText={name} buttonImage={img} aboutclick="dashboard" click="profile" iconclick="dashboard" id1={id1} buttonClassName="custom-profile-class" imageSize={50} />

        {/* home section */}
        <section>
          <div className="home">
            <div className="home-left">
              <h1>Find products you can trust.</h1>
              <p>
                <span>Gaugemaven</span> is a revolutionary platform built to help you find trusted products by reading
                and writing reviews.
              </p>
              <form className="product-search">
                
               
                <img src={search}/>
                      <input type="text" placeholder="Search for any product..." className="product-search" onChange={onChange} value={value} />
                     
                     <button className="search-btn"  style={{display:"none"}}
                     onClick={()=>{ navigate('/product-review1',{replace:true,state:{productN:value,id2:id1,image:img,name:name}});}}
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
            </div>
            <div className="home-right">
              <img src={homeImg} alt="Home" />
            </div>

            <img src={shape1} className="shape1" alt="Shape 1" />
            <img src={shape2} className="shape2" alt="Shape 2" />
            <img src={shape3} className="shape3" alt="Shape 3" />
          </div>
        </section>
      </div>
      
      <Categories click="main-categories" id1={id1} image={img} name={name}/>
      <Features id1={id1} click="dashboard" />
      <Faq/>
      <Footer/>
  


     
    </div>
     );
}
 
export default Dashboard;