import logo from "../Images/logo.svg"
import instagram from "../Images/instagram.svg"
import twitter from "../Images/twitter.svg"
import {Link} from "react-router-dom"
import "../css/Footer.css"
import { useNavigate } from "react-router-dom"
const Footer = () => {
    const navigate=useNavigate();
    const handleClick1= () => {
        // Assuming you have an element with the id 'features'
        const featuresElement = document.getElementById('faq');
    
        if (featuresElement) {
          featuresElement.scrollIntoView({ behavior: 'smooth' });
        }
      };
    return ( 
        <div >
            <footer className="footer">
                <div className="footer1">
                    <img src={logo} className="logo"/>
                    <p>© 2023 Gaugemaven, Inc.
All rights reserved.</p>
                </div>
                <div>
                    <h6>ABOUT GAUGEMAVEN</h6>
                    <p><Link to="/">Home</Link></p>
                    <p><div onClick={()=>navigate('/about',{replace:true,state:{click:""}})}>About Us</div></p>
                    <p onClick={handleClick1}><Link to="/">FAQ</Link></p>
                </div>
                <div>
                    <h6>NOT QUITE READY FOR GAUGEMAVEN?</h6>
                    <p>Contact us:<span> gaugemaven@gmail.com</span></p>
                    <p>Follow us to know more</p>
                    <div className="social-media">
                        <img src={instagram}/>
                        <img src={twitter}/>
                    </div>
                </div>
            </footer>
        </div>
     );
}
 
export default Footer;