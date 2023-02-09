import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import FindProject from './FindProject/FindProject';
import Home from "./Home/Home";
import twlogo from "../src/img/iconlogo_white.png";

const styles = {
  header: {
    backgroundImage:`url(${twlogo})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    // backgroundSize: '100% 100%',
    //backgroundSize: 'cover',
    
    // height:800,
    // width:800,
  
    
    
    
    
  },

  // content: {
  //   height: '100%',
  //   width: '100%',
  //   backgroundColor: 'rgba(0, 0, 0, 0)',
  // }
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
