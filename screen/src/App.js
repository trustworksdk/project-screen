import { Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import FindProject from './FindProject/FindProject';
import Home from "./Home/Home";
import twlogo from "../src/img/tw_white.png";

const styles = {
  header: {
    backgroundImage:`url(${twlogo})` ,
    width:'100%',
    height:'100%',
    backgroundPosition: '800px 100px',
    backgroundRepeat:"no-repeat",
    backgroundSize:"50% 70%",
    // display: "inline-table"
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
