import "./App.css"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { BrowserRouter, useLocation } from "react-router-dom"
import AppRoutes from "./Routes"
import CartContext from "./Context/CartContext"

function AppContent() {
  const location = useLocation()
  const hideFooter = location.pathname === "/login"

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartContext>
        <AppContent />
      </CartContext>
    </BrowserRouter>
  )
}

export default App
