import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar-LAPTOP-VNKPELLA';
import Home from './pages/Home-LAPTOP-VNKPELLA';
import About from './pages/About-LAPTOP-VNKPELLA';
import Contact from './pages/Contact-LAPTOP-VNKPELLA';
import Register from './pages/Register-LAPTOP-VNKPELLA';
import Login from './pages/Login-LAPTOP-VNKPELLA';
import Debate from './pages/Debate-LAPTOP-VNKPELLA';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/debate" element={<Debate />} />
      </Routes>
    </Router>
  );
}

export default App;