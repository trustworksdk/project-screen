import styled from "styled-components"

export const Wrapper = styled.div`

@media (orientation: portrait) {
    .vertical-layout {
        display: flex;
        flex-direction: column;
        height: 95vh;
        width: 85%;
        margin: auto;
        align-items: center; /* Center items horizontally */
        justify-content: center; /* Center items vertically */
    }

    .row-flex {
        flex: 1;
        display: flex;
        border: 1px solid green;
    }

    .client-logo-row{
      object-fit: none;
    }

    .tools{
        margin-top: 10%;
    }

    h3{
        font-weight: bold;
        color: #192434;
        font-size: 40px;
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
        font-size: 40px;
    }

    // .card-group{
    //     margin-top: 50px;
    // }

    // .card-img-top {
    //     object-fit: contain;
    // }

    // .person.card.text.bg-transparent.border-0{
    //     font-size: 17px;
    //     padding: 10px;
    // }

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
  
  
    .employeephoto {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 50%;
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
    }
    
    .carousel-control-next { 
    }

    .carousel-control-prev{
    }

    .carousel-indicators {
        background-color: transparent; /* Make the background transparent */
        padding: 0;
        margin: 0;
        list-style: none;
        position: absolute;
        bottom: 10px; /* Adjust to place below the carousel */
        left: 0;
        right: 0;
        text-align: center;
    }
    
    .carousel-indicators li {
        background-color: lightgrey; /* Color of inactive indicators with some transparency */
        width: 20px; /* Width of each line segment */
        height: 5px; /* Height of the line */
        border-radius: 0;
        display: inline-block;
        margin: 0 2px; /* Space between line segments */
    }
    
    .carousel-indicators .active {
        background-color: black; /* Color of the active indicator */
        height: 20px;
        width: 70px;
    }


    h1 {
        color: #192434;
        font-size: 65px;
        font-weight: bold;
    }

    h2 {
        color: #192434;
        font-size: 52px;
    }

  }

`