import styled from "styled-components"


export const Wrapper = styled.div`
    // background: #203369;
    font-family: 'Source Sans Pro';
    


    .card {
        background: #203369;
        width: 20%;
        border: 2px solid #203369;
        margin: 0 auto;
        margin-top: 2em;
        box-shadow: 4px 4px 7px 0 rgba(0, 0, 0, 0.10);
        border-radius: 12px;
    }

    
    .cardtitle {
        font-size: 20px;
        color: black;
        letter-spacing: 120%;
        font-weight: 600;
        color: #53D49C;
    }

    .cardtext {
        color: #CAE2E1;
    }

   

    .carousel{
        padding-top: 6%;
        height: 100%;
    }

    .card-1 {
        width: 300px;
        height: 500px;
        background-color: transparent;
        border-radius: 10px;
        padding-bottom: 50px;
        text-align: center;
        border: none;
      }

      .white-circle {
        width: 250px;
        height: 250px;
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
      }

      .content {
        text-align: center;
        color: #E3DDD5;
        font-size: 25px;
      }

      .col{
        padding-top: 30px;
        padding-left: 50px;
        padding-right: 50px;
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
      }
       
      .carousel-control-prev {
        left: -4%;
        
      }
      .carousel-control-next {
        right: -4%;
      }

      .carousel-indicators {
        margin: -90px;
      }

    
   
    


`