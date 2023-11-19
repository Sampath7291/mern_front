// Home.js
import React from "react";
import Navbar from "./Navbar";
import "../css/Home.css";
import bg from "../Images/BackGround.svg";
import arrowRight from "../Images/Arrow-Right.svg";
import homeImg from "../Images/home-images.svg";
import shape1 from "../Images/Shape1.svg";
import shape2 from "../Images/Shape 2.svg";
import shape3 from "../Images/Shape 3.svg";
import Categories from "./Categories";
import Features from "./Features";
import Faq from "./Faq";
import search from "../Images/searchicon.svg"
import { Link } from "react-router-dom";
// import Profile from "./Profile";
// import MainCategories from "./MainCategories";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate=useNavigate();
  return (
    <div>
      <img src={bg} className="bg-image" />
      <div className="main">
        {/* navbar */}
        <Navbar
          buttonText="Log in"
          buttonImage={`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%22-0.095%20-0.095%203%203%22%20height%3D%223%22%20width%3D%223%22%3E%3Cg%20id%3D%22end-point-arrow%22%3E%3Cpath%20id%3D%22Vector%207%22%20fill%3D%22%23d7e0ff%22%20d%3D%22M1.5428656249999997%201.8985062499999998%202.4148437499999997%201.3171875l-0.8719781249999999%20-0.58131875L1.7367117187499999%201.3171875l-0.19384609375%200.58131875Z%22%20stroke-width%3D%220.19%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22Vector%204%22%20stroke%3D%22%234147d5%22%20stroke-linecap%3D%22square%22%20d%3D%22M0.21953124999999998%201.3171875h1.4952273437499999%22%20stroke-width%3D%220.19%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22Vector%206%22%20stroke%3D%22%234147d5%22%20stroke-linecap%3D%22square%22%20d%3D%22M1.5428656249999997%201.8985062499999998%202.4148437499999997%201.3171875l-0.8719781249999999%20-0.58131875L1.7367117187499999%201.3171875l-0.19384609375%200.58131875Z%22%20stroke-width%3D%220.19%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E`}
          click="login"
          buttonClassName="register-btn"
          iconclick=""
          aboutclick=""
        />

        {/* home section */}
        <section>
          <div className="home">
            <div className="home-left">
              <h1>Find products you can trust.</h1>
              <p>
                <span>Gaugemaven</span> is a revolutionary platform built to
                help you find trusted products by reading and writing reviews.
              </p>
              <div className="product-search">
            <img src={search}/>
          <input
            type="text"
            placeholder="Search for any product"
            onClick={()=>navigate('/login')}
          />
          </div>
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
      <Categories click="login" />
      <Features  click=""/>
     
      <Faq />
      <Footer/>
      {/* <Profile/> */}
      {/* <MainCategories/> */}
    </div>
  );
};

export default Home;
