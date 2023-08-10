import styled from "styled-components"




export const Wrapper = styled.div`
    // background: #203369;
    font-family: "Roboto", sans-serif;
    font-size: 20px;

  
    background-image: none !important;
    background: #E3DDD5;
    height: 1100px;

    h1 {
      color: white;
    }

    h2 {
      color: white;
    }

    p {
      color: white;
    }

    .btn.btn-primary.back {
      margin-top: 50px;
      margin-left: 70px;
      background: white;
      border: 0;
      color: #455977;
      font-weight: bold;
      font-size: 17px;
      border-radius: 10px;
      width: 200px;
      height: 50px;
  }

    .btn.btn-primary.nulstil {
      margin-top: 50px;
      background: white;
      border: 0;
      color: #455977;
      font-weight: bold;
      font-size: 17px;
      border-radius: 10px;
      width: 200px;
      height: 50px;
      float: right;
      margin-right: 70px;
    }

    .row {
      margin-left: 10px;
      margin-right: 10px;
    }

    .card {
        // background: #203369;

        width: 350px;
        height: 550px;
        background-color: transparent;
        border: none;
        margin: 0 auto;
        margin-top: 2em; 
        
    }

    
    // .cardtitle {
    //     font-size: 20px;
    //     color: black;
    //     letter-spacing: 120%;
    //     font-weight: 600;
    //     color: #53D49C;
    // }

    // .cardtext {
    //     color: #CAE2E1; 
    // }

   

    .carousel{
        padding-top: 7%;
        // height: 100%;
    }


      .white-circle {
        width: 350px;
        height: 350px;
        border-radius: 50%;
        background-color: white;
        margin: 0 auto 20px;
        position: relative;
        overflow: hidden;
        
      }

      .avatar {
        display: block;
        max-width: 80%;
        max-height: 80%;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        
      }

      .content {
        text-align: center;
        font-size: 25px;
        color: #455977;
        margin-top: 20px;
      }

      p {
        color: #455977;
        text-align: center;
      }

      // .dropdown{
      //   background-color: #455977; 
      // }

      .dropdown-toggle.btn.btn-primary.btn-lg{
        background-color: #455977;
        color: E3DDD5;
        border: none;
      }

      // for at flytte control pilene til henholdsvis venstre og højre:
      .carousel-content {
        position: relative;
        padding: 0 80px; /* Adjust padding as needed */
      }

      .carousel-control-prev,
      .carousel-control-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        filter: invert(100%);
      }
       
      .carousel-control-prev {
        left: -4%;
        
      }
      .carousel-control-next {
        right: -4%;
      }

      .carousel-indicators {
        margin: -50px;
        
      }

    
   
    


`