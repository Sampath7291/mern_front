// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Categories from "./Components/Categories";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Features from "./Components/Features";
import Faq from "./Components/Faq";
import Dashboard from "./Components/Dashboard";
import MainCategories from "./Components/MainCategories";
import Profile from "./Components/Profile";
import ImageCarousel from "./Components/ImagesCarousel";
import Product from "./Components/Product";
import ProductReview from "./Components/ProductReview";
import About from "./Components/About";
import WriteReview from "./Components/WriteReview";
import MyReviews from "./Components/MyReviews";
import ProductReview1 from "./Components/ProductReview1";
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/main-categories" element={<MainCategories />} />
          <Route path="/main-categories" element={<MainCategories />} />
          <Route path="/product" element={<Product/>} />
          {/* <Route path="/product/:productN/:productR" element={<ProductReview/>} /> */}
          {/* <Route path="/product/:productN/:productR" element={<ProductReview/>} /> */}
          <Route path="/product-review" element={<ProductReview/>} />
          <Route path="/product-review1" element={<ProductReview1/>} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/myreviews" element={<MyReviews/>} />
          <Route path="/product-images" element={<ImageCarousel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
