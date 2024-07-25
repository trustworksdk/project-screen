import styled from "styled-components"

export const Wrapper = styled.div`
    .container {
        max-width: 80vw;
    }

    .counter {
        background-color: #eee;
        height: 10rem;
        width: 10rem;
        border-radius: 50%;
    }

    .card-body > .row {
        height: auto;
    }

    .mr-5 {
        margin-right: 1rem;
    }

    .counter > h3 {
        font-size: 2.5rem;
    }

    .row {
        height: 33vh; 
    }

    .right-border {
        border-right: 0.5rem solid #ebe7e1; 
    }

    .card-img {
        width: 66%;
    }

    h1 {
        color: #192434;
        font-size: 5rem;
        font-weight: 800;
        background-color: transparent;
    }

    h2 {
        color: #192434;
        font-size: 2rem;
        font-weight: 450;
    }

    h3 {
        color: #192434;
        font-size: 2rem;
        font-weight: 100;
        line-height: 1.5;
    }

    .text-ellipsis-project-description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 21; /* Adjust the number of lines to show */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }

      .text-ellipsis-project-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* Adjust the number of lines to show */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }
    
    .roller-og-tools{
        padding-left: 2vh;
        overflow: hidden;
        height: 100%;
    }

    .ydelser-og-tools-knap{
        border-radius: 1rem;
        border: none;
        margin-right: 1rem;
        margin-top: 1rem;
        font-size: 1.5rem;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .roller{
        color: #374B05;
        background-color: #eaf3ff;
    }


    .tools{
        color: #FF7201;
        background-color: #eaf3ff;
    }

  
    .employeephoto {
        object-fit: cover;
        height: 10rem;
        width: 10rem;
        border-radius: 50%;
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      display: none; /* Hide the default icons */
    }

    .carousel-indicators {
        margin: 0;
    }
    
    .carousel-indicators button {
        background-color: #E3DDD5;
        margin: 0; /* Space between line segments */
        border: none;
        width: 15vw;
        padding: 1px;
    }

    
    .carousel-indicators .active, .button {
        background: linear-gradient(to right, #E3DDD5, #455977);
    }

`