import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

// var cors = require('cors')

// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }

// app.use(cors(corsOptions));

// window.location.reload()
const root = ReactDOM.createRoot(document.getElementById('root'));

function tick() {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

setInterval(tick(), 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
