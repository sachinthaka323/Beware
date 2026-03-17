import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Socks from "./pages/Socks";
import Accessories from "./pages/Accessories";
import About from "./pages/About";
import OurServices from "./pages/OurServices";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/ProductDetails";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/socks" element={<Socks />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/:id/:color" element={<ProductDetails />} />
        
        

      </Routes>
      <WhatsAppFloat />
      <Footer/>
    </Router>
  );
}

export default App;