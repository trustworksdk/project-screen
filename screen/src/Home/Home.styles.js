import styled from "styled-components"
import twlogo from "../../src/img/iconlogo_white.png";

export const Wrapper = styled.div`
    // background: white;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    

    h1 {
        color: #192434;
        font-size: 48px;
        font-weight: bold;
    }

    h2 {
        color: #192434;
        font-size: 23px;
    }

    .periode{
        font-weight: bold;
        font-size: 30px;
        margin-bottom: 15px;
    }
   
    .card-group{
        margin-top: 50px;
    }

    .row{
        margin-right: 300px;
    }

    .col-sm-8{
        padding-left: 100px;
        padding-right: 200px;
    }


    .col-sm-4 {
        // background-color: #CAE2E1;
        // border-radius: 0px 90px 90px 0px;
        padding-top: 40px;
        padding-left: 10px;
        height: 700px;
        border-right: 15px solid #193B670D;
    }

    .card-img-top {
        width: 20%;
        height: 10vw;
        object-fit: cover;
    }

    .people {
        color: #16215B;
    }

    .person.card.text.bg-transparent.border-0{
        font-size: 17px;
        padding: 10px;
    }

    .btn.btn-primary {
        margin-top: 50px;
        margin-left: 50px;
        background: #DFD8D282;
        border: 0;
        color: #455977;
        font-weight: bold;
        font-size: 20px;
        padding: 15px;
    }
    

    .ydelser-og-tools{
        margin-top: 20%;
        padding-left: 10%; 
        color: #192434;
    }

    .tools{
        margin-top: 10%;
    }

    .ydelser-og-tools-overskrift{
        font-weight: bold;
        color: #192434;
        font-size: 30px;
    }

    .ydelser-og-tools-knap{
        border-radius: 11px;
        border: none;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        margin-right: 25px;
        color: #FF7201;
        margin-top: 10px;
    }

    // .personcardbody{
    //     display: table;
    //     // text-align: center;
    // }

    .userdescription{
        font-size: 18px;
        padding-left: 20px;
        display: flex;
        display: table-cell;
        vertical-align: middle;
    }

    .employeerow {
        margin-right: 0;
        overflow: hidden; /* Prevent horizontal scroll if images exceed the container width */
    }
      
    .employeecol {
        padding: 0;
        margin-right: -10;
        // margin-bottom: 10px; /* Optional: Add some margin between each image */
        display: inline-block;
    } 
      
    .employeephoto {
        width: 130px;
        height: 110px;
        border-radius: 50%;
        margin-top: 100px;
    }

    .carousel-control-prev-icon, .carousel-control-next-icon {
        position: absolute;
        top: 40%;
        transform: translateY(-50%);
        // background-color: red;
        border: 1px solid black;
        filter: invert(100%);
    }
       
    .carousel-control-prev-icon {
        left: 7%;
    }
    
    .carousel-control-next {
        right: -5%;
    }

    .carousel-indicators {
        // background-color: darkgray;
        filter: invert(100%);
    }

    .carousel-inner{
        height: 900px;
    }

    .carousel-control-prev{
        width: 10px;
    }




  
    


`