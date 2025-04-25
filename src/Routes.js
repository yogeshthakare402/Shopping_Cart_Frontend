import { Routes, Route } from "react-router-dom"
import Home from "./Components/Home"
import Cart from "./Components/Cart"
import ProductCarousel from "./Components/ProductCarousel"
import Filter from "./Components/Filter"
import Login from "./Components/Login"

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <ProductCarousel />
                        <Home />
                    </>
                }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/filters" element={<Filter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<div>About Us</div>} />
            <Route path="/terms" element={<div>Terms & Conditions</div>} />
            <Route path="/faq" element={<div>FAQ</div>} />
            <Route path="/privacy-policy" element={<div>Privacy Policy</div>} />
            <Route path="/e-waste-policy" element={<div>E-waste Policy</div>} />
            <Route path="/cancellation-return" element={<div>Cancellation & Return Policy</div>} />
            <Route path="/category/:categoryName" element={<Home />} />
        </Routes>
    )
}

export default AppRoutes 