import Navbar from "../Components/Navbar"
import "../css/Signup.css";
import bg from "../Images/BackGround.svg";
import rightarrow from "../Images/rightarrow.svg";
import image from "../Images/signupImage.svg";
import { useState } from "react";
import Axios from "axios";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = email.split('@')[0];
        const data = { email: email, password: password,name:name,country:"",lang:""}
        Axios.post("https://mern-back-2pn7.onrender.com/product/create-account",data)
        .then((res)=>{
            if(res.status === 200)
            navigate('/dashboard',{replace:true,state:{id1:res.data._id}});
            else {
                alert("res.status:"+ res.status)
                alert('Please fill in the details');
                Promise.reject();
            }
        })
        .catch((err)=>console.log(err));
    
      }

    return ( 
        <div className="signup-body">
<img src={bg} width="100%" className="bg-image"/>
        <div className="main signup">
            {/* navbar */}
            <Navbar buttonClassName="custom-btn-class" iconclick="" lidisplay="hide"/>
<h1>Read reviews. Write reviews.<br></br> Find products.</h1>
{/* signup */}
<div className="signup signup-box">
  {/* signup-left */}
<div className="signup-left">
<h4>Sign up</h4>
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
            <label>Confirm Password</label>
            <input 
            className="password"
            placeholder='Re enter password'
              type="password" 
              required 
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <p>Already have an account?  <Link to="/login"><span>Log in!</span></Link></p>
            <button className="signup-btn"><div className="btn-circle1"></div><span>Sign up</span><div className="btn-circle2" ></div></button>
            </form>
</div>
{/* signup-right */}
<div className="signup-right">
<img src={image}/>
</div>
</div>
        </div>
        <Footer/>
        </div>
     );
}
 
export default Signup;