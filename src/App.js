import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import AboutUs from './AboutUs.jsx';
import DevInfo from './DevInfo.jsx';
import SizingGuide from './SizingGuide.jsx';
import Profile from './Profile.jsx';
import Contact from './Contact.jsx';
import Shop from './Shop.jsx';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/devinfo" element={<DevInfo/>}/>
        <Route path="/sizing-guide" element={<SizingGuide/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/shop" element={<Shop/>}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
