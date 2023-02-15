import { Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import FindProject from './FindProject/FindProject';
import Home from "./Home/Home";
import twlogo from "../src/img/tw_white.png";

const styles = {
  header: {
    backgroundImage:`url(${twlogo})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
  },
}




function App() {
  return (
    <div className="App" style={styles.header}>
      
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/findproject" element={ <FindProject/> } />
      </Routes>

   
    
    
    </div>
  );
}

export default App;
