import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Cart from './Components/Cart';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
