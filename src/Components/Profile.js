import "../css/Profile.css";
import { useParams } from "react-router-dom";
import bg from "../Images/BackGround.svg";
import Navbar from "../Components/Navbar";
import profileImg from "../Images/profile-img.png";
import rightarrow from "../Images/rightarrow.svg"
import { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
const Profile = () => {
    const[image1,setImage] =useState('');
    const location=useLocation();
    const id=location.state.id1;
    console.log(id,"profile");
    const [data , setData] = useState({email:"",password:"",name:"",country:"",lang:"",image:""});
    let [email1,setEmail] = useState('');
    let [name1,setName] = useState('');
    let [country1,setCountry] = useState('');
    let [lang1,setLang] = useState('');
    function convertToBase64(e){
        console.log(e);
        const WIDTH=80
        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
            console.log(reader.result);
            let image_url=reader.result;
            let image=document.createElement("img");
            image.src=image_url;
            image.onload=(e)=>{
                let canvas=document.createElement("canvas");
                let ratio=WIDTH/e.target.width
                canvas.width=WIDTH;
                canvas.height=e.target.height*ratio;
                const context=canvas.getContext("2d");
                context.drawImage(image,0,0,canvas.width,canvas.height);
                setImage(context.canvas.toDataURL(90));
            }
        };

        reader.onerror=error=>{
            console.log("error: ",error);
        }
        
    };
    const handleSubmit1 = (e) => {
        setImage(`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%22-2.145%20-2.145%2060%2060%22%20height%3D%2260%22%20width%3D%2260%22%3E%3Cg%20id%3D%22user-circle-single--circle-geometric-human-person-single-user%22%3E%3Cpath%20id%3D%22Ellipse%204%22%20fill%3D%22%238fbffa%22%20d%3D%22M0%2027.854999999999997a27.854999999999997%2027.854999999999997%200%201%200%2055.709999999999994%200A27.854999999999997%2027.854999999999997%200%201%200%200%2027.854999999999997%22%20stroke-width%3D%224.29%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22Ellipse%205%22%20fill%3D%22%232859c5%22%20d%3D%22M17.906785714285714%2019.896428571428572a9.948214285714286%209.948214285714286%200%201%200%2019.896428571428572%200%209.948214285714286%209.948214285714286%200%201%200%20-19.896428571428572%200%22%20stroke-width%3D%224.29%22%3E%3C%2Fpath%3E%3Cpath%20id%3D%22Subtract%22%20fill%3D%22%232859c5%22%20d%3D%22M44.739109285714285%2041.7825A21.842299285714283%2021.842299285714283%200%200%200%2027.854999999999997%2033.82392857142857a21.842299285714283%2021.842299285714283%200%200%200%20-16.884109285714285%207.958571428571428A21.842299285714283%2021.842299285714283%200%200%200%2027.854999999999997%2049.74107142857142a21.842299285714283%2021.842299285714283%200%200%200%2016.884109285714285%20-7.958571428571428Z%22%20stroke-width%3D%224.29%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E`);
        e.preventDefault();
        // const config={
        //     headers:{
        //         "Content-Type":"application/json",
        //         Accept:"application/json",
        //         "Access-Control-Allow-Origin":"*"
        //     }
        // }
        // const newObj = {email:email1,name: name1, country: country1 , lang: lang1,image:{image1}};
        // Axios.put("http://localhost:4000/product/update-profile/" + id , newObj,config)
        // .then((res)=>{
        //     if(res.status === 200){
        //         alert("Record updated successfully");
        //     }
        //     else{
        //         Promise.reject();
        //     }
        fetch("https://mern-back-2pn7.onrender.com/product/update-profile1/" + id,{
            method:"PUT",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                image:image1,

            })
        }).then((res)=>res.json()).then((data)=>alert("Profile Updated Succcessfully!")
        // })
        // Handle the file change event here, if needed
        // const selectedFile = e.target.files[0];
        // console.log('Selected file:', selectedFile);
    };
    useEffect(()=>{
        Axios.get("https://mern-back-2pn7.onrender.com/product/update-profile/" + id)
        .then((res)=>{
            if(res.status === 200){
                setImage(res.data.image);
                setEmail(res.data.email);
                setName(res.data.name);
                setCountry(res.data.country);
                setLang(res.data.lang);
                const {email,password,name,country,lang,image} = res.data; 
                setData({email,password,name,country,lang,image})
                
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>alert(err));
    },[id])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // const config={
        //     headers:{
        //         "Content-Type":"application/json",
        //         Accept:"application/json",
        //         "Access-Control-Allow-Origin":"*"
        //     }
        // }
        // const newObj = {email:email1,name: name1, country: country1 , lang: lang1,image:{image1}};
        // Axios.put("http://localhost:4000/product/update-profile/" + id , newObj,config)
        // .then((res)=>{
        //     if(res.status === 200){
        //         alert("Record updated successfully");
        //     }
        //     else{
        //         Promise.reject();
        //     }
        fetch("https://mern-back-2pn7.onrender.com/update-profile/" + id,{
            method:"PUT",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                image:image1,
                email:email1,
                name:name1,
                country:country1,
                lang:lang1
            })
        }).then((res)=>res.json()).then((data)=>console.log(data))
        // })
        // Handle the file change event here, if needed
        // const selectedFile = e.target.files[0];
        // console.log('Selected file:', selectedFile);
    };
    
    return ( 
        <div>
            <img src={bg} width="100%" className="bg-image" />
            <div className="main"> 
                <Navbar buttonText={name1} buttonImage={image1} iconclick="dashboard" lidisplay="hide" click="profile" id1={id} buttonClassName="custom-profile-class" imageSize={50} />
                <div className="profile-box">
                    <div className="profile-details"> 
                    {/* {image==""||image==null?"":    } */}
                    <img src={image1} style={{borderRadius:"100%",width:"60px",height:"60px"}} />
                    <div>
                    <h5>{name1}</h5>
                    <p>{country1}</p>
                    </div>
                    </div>
                    <h4>Personal details</h4>
                    
                    <form className="profile-form" onSubmit={handleSubmit} >
                    {/* profile picture input */}
                    <label htmlFor="profilePicture" className="file-input" >
                   
  Upload a new profile picture
  <input
    type="file"
    id="profilePicture"
    accept="image/*"
    onChange={convertToBase64}
    defaultValue={data.image}
    style={{ display: 'none' }}
  />
</label><br></br> 
<button className="RemovePic-btn" onClick={handleSubmit1}>Remove the current profile picture</button><br></br> 
                    <label className="profile-form-label">Email</label>
                    <input type="email"  onChange={(event)=>setEmail(event.target.value)} 
                    defaultValue={data.email} className="profile-form-input"/>
                    <label className="profile-form-label">name</label>
                    <input type="text" onChange={(event)=>setName(event.target.value)}
                    defaultValue={data.name}  className="profile-form-input"/>
                    <label className="profile-form-label">Country</label>
                    <input type="text"   onChange={(event)=>setCountry(event.target.value)}
                    defaultValue={data.country} className="profile-form-input"/>
                    <label className="profile-form-label">Language</label>
                    <input type="text" onChange={(event)=>setLang(event.target.value)} 
                    defaultValue={data.lang} className="profile-form-input"/>
                    <button className="psbmt-btn">Submit <img src={rightarrow}/></button>
                    </form>
                </div>
                </div>
                <Footer/>
            </div>
        
     );
}
export default Profile;
