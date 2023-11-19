// Navbar.js
import "../css/Navbar.css";
import { useState } from "react";

import logo from "../Images/logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ buttonText, buttonImage, buttonClassName ,id1,click,lidisplay,iconclick,aboutclick,imageSize}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  console.log(id1,"navbar")
  const navigate = useNavigate();
  const handleClick = () => {
    // Assuming you have an element with the id 'features'
    const featuresElement = document.getElementById('features');

    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleClick1= () => {
    // Assuming you have an element with the id 'features'
    const featuresElement = document.getElementById('categories');

    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div >
      <nav>
        <div className={`navbar ${menuOpen ? "active" : ""}`}>
        <div onClick={()=>{ navigate(`/${iconclick}`,{replace:true,state:{id1:id1}});}}>
          <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className={lidisplay}>
          <ul >
            
          <div onClick={handleClick1}>  
          {/* <a href="#categories" id1={id1} image={buttonImage} name={buttonText} > */}
            <li>Categories</li>
            </div>
            {/* </a> */}
            <div onClick={handleClick}>
            <li>Features</li>
            </div>
            <div onClick={()=>navigate('/about',{replace:true,state:{click:aboutclick,id1:id1}})} >
            <li >About</li>
            </div>
            
          </ul>
          </div>
          
          <div className={buttonClassName} onClick={()=>navigate(`/${click}`,{replace:true,state:{id1}})}>
          <div className="profile" onClick={toggleDropdown}>
          <img src={buttonImage} style={{borderRadius:"100%"}}/>
          <p>{buttonText}</p>
            
            
          </div>
          </div>
          <div
            className={`profile-dropdown ${isDropdownVisible ? "show" : ""}`}
          >
            <div onClick={()=>navigate('/profile',{replace:true,state:{id1:id1}})}>
              <li>Edit profile</li>
            </div>
            <div onClick={()=>navigate('/myreviews',{replace:true,state:{id2:id1,image:buttonImage,name:buttonText}})}>
              <li>My reviews</li>
            </div>
            <div onClick={()=>navigate('/')} >
            <li className="logout">Log out</li>
            </div>
          </div>
          {/* <button
            className={`register-btn ${buttonClassName}`}
            
          >
            {buttonText}
            {buttonImage && <img src={buttonImage} alt="Arrow"  style={{ width: imageSize, height: 'auto' }} />}
          </button> */}
            
        </div>
        <div
          className={`hamburger-menu ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
