import styled from "styled-components"

export const Wrapper = styled.div`

@media (orientation: portrait) {
    .vertical-layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 85%;
        margin: auto;
        align-items: center; /* Center items horizontally */
        justify-content: center; /* Center items vertically */
    }

    .custom-container{
        width: 100%;
        margin: 0 !important;
        padding: 0 !important;
    }

    .row-flex {
        flex: 1;
        display: flex;
        max-height: 33vh; /* Set max height to 1/3 of the viewport height */
        overflow-y: hidden;        
    }

    .right-border {
        border-right: 20px solid #D3D3D3; /* Change 2px to your desired width and grey to your desired color */
    }

    .client-logo-container {
        flex: 0 0 50%; /* 2/4 of the height */
        display: flex;
        align-items: center;
        justify-content: center;

      }
      
      .project-name-container, 
      .project-date-container {
        flex: 0 0 25%; /* 1/4 of the height each */
        display: flex;
        align-items: center;
        justify-content: left;
      }
      
    .client-logo {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .row-description{
        flex: 1;
        max-height: 33vh; /* Set max height to 1/3 of the viewport height */
        overflow-y: auto;
    }

    .tools{
        margin-top: 10%;
    }

    h1 {
        color: #192434;
        font-size: 75px;
        font-weight: bold;
        background-color: transparent;
    }

    h2 {
        color: #192434;
        font-size: 55px;
        font-weight: bold;
    }

    h3{
        color: #192434;
        font-size: 48px;
    }

    .text-ellipsis {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 13; /* Adjust the number of lines to show */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
    
    .ydelser-og-tools{
        padding-left: 1.5vh;
        
    }

    .ydelser-og-tools-knap{
        border-radius: 11px;
        border: none;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 12px;
        padding-right: 12px;
        margin-right: 25px;
        margin-top: 10px;
        font-size: 48px;
    }

    .ydelser{
        color: #374B05;
        background-color: #eaf3ff;
    }

    .tools{
        color: #FF7201;
        background-color: #eaf3ff;
    }

    .employee-container{
        padding-top: 3vh;

    }
  
    .employeephoto {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      display: none; /* Hide the default icons */
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

  }

`