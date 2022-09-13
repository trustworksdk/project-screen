import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './Home/home';
import axios from "axios";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
      </Routes>

   
    </div>
  );
}

export default App;
