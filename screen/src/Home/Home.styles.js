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
        max-height: 33vh; /* Set max height to 1/3 of the viewport height */
        overflow-y: hidden;        
    }

    .right-border {
        border-right: 20px solid #D3D3D3; /* Change 2px to your desired width and grey to your desired color */
    }

    .row-description{
        flex: 1;
        max-height: 33vh; /* Set max height to 1/3 of the viewport height */
        overflow-y: auto;
    }

    .client-logo-row{
      object-fit: none;
      background-color: transparent;
    }

    .tools{
        margin-top: 10%;
    }

    h1 {
        color: #192434;
        font-size: 65px;
        font-weight: bold;
        background-color: transparent;
    }

    h2 {
        color: #192434;
        font-size: 52px;
    }

    h3{
        font-weight: bold;
        color: #192434;
        font-size: 40px;
    }

    .text-ellipsis {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 17; /* Adjust the number of lines to show */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
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