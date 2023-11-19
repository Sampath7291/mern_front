import Navbar from "../Components/Navbar"
import "../css/Login.css";
import bg from "../Images/BackGround.svg";
import rightarrow from "../Images/rightarrow.svg";
import image from "../Images/signupImage.svg";
import { useState } from "react";
import Axios from "axios";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('https://mern-back-2pn7.onrender.com/product/login',{email,password})
        .then((res)=>{
            
            if(res.data==0){
              alert("Password is incorrect")
              
            }
            else if(res.data==1){
              alert("Account does not exist")
            }
            else{
              
              console.log(res.data,"login")
              navigate('/dashboard',{replace:true,state:{id1:res.data}});
            }
        })
        .catch((err)=>console.log(err));
      }


    return ( 
        <div className="login-body">
<img src={bg} width="100%" className="bg-image"/>
        <div className="main login">
            {/* navbar */}
            <Navbar buttonClassName="custom-btn-class" lidisplay="hide" iconclick="" aboutclick="dashboard"/>
<h1>Read reviews. Write reviews.<br></br> Find products.</h1>
{/* login */}
<div className="login-box">
  {/* login-left */}
<div className="login-left">
<h4>Log in</h4>
<form onSubmit={handleSubmit}>
            <label>Email</label>
            <input 
            className="email"
            placeholder='your@gmail.com'
              type="text" 
              required 
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label>Password</label>
            <input 
            className="password"
            placeholder='combination of letter, symbols and numericals'
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Don’t have an account?  <Link to="/signup"><span>Sign up!</span></Link></p>
            {/* <Link to="/dashboard"> */}
            <button className="login-btn"><div className="btn-circle1"></div><span>Log in<img src={rightarrow} /></span><div className="btn-circle2" ></div></button>
            {/* </Link> */}
            </form>
</div>
{/* login-right */}
<div className="login-right">
<img src={image}/>
</div>
</div>
        </div>
        <Footer/>
        </div>
     );
}
 
export default Login;