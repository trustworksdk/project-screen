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
  
    .employeecol {
        padding: 0;
        margin-right: -10;
        display: inline-block;
    } 

    
      
    .employeephoto {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        margin: 5%;
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
        background-color: orange;
        border: 20px;
    }

    h1 {
        color: #192434;
        font-size: 60px;
        font-weight: bold;
    }

    h2 {
        color: #192434;
        font-size: 40px;
    }

  }

`