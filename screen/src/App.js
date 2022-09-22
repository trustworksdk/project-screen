import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import FindProject from './FindProject/FindProject';
import Home from "./Home/Home";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/findproject" element={ <FindProject/> } />
      </Routes>

   
    </div>
  );
}

export default App;
