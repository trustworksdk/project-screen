import styled from "styled-components"


export const Wrapper = styled.div`

@media screen and (orientation: portrait) {
    .card-body > .row {
        height: auto;
    }

    .card-img {
        width: 66%;
    }

    .row {
        ${'' /* height: 33vh;  */}
    }
}

* {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    ${'' /* line-height: 1.75; */}
}

.container, .container-fluid {
    height: 99vh;
}

.right-border {
    border-right: 0.5em solid #eee;
}

.left-border {
    border-left: 0.5em solid lightgray;
}

h1 {
    font-weight: 500;
}

.text-ellipsis-project-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 15; /* Adjust the number of lines to show */
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

.roller-og-tilgang{
    overflow: hidden;
    ${'' /* height: 100%; */}
}

.roller-og-tilgang-knap{
    ${'' /* border-radius: 1em; */}
    border: none;
    margin-top: 0.75em;
    ${'' /* font-size: 1.25em; */}
    font-weight: 300;
}

.counter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 7.5em;
    width: 7.5em;
}

.roller{
    color: #374B05;
    background-color: #eaf3ff;
}


.tilgang{
    color: #FF7201;
    background-color: #eaf3ff;
}

.employeephoto {
    object-fit: cover;
    height: 7.5em;
    width: 7.5em;
    border-radius: 50%;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    display: none; /* Hide the default icons */
}

.carousel-indicators {
    margin: 0;
    padding: 0 5%;
}

.carousel-indicators button {
    background-color: lightgray;
    margin: 0; /* Space between line segments */
    border: none;
    width: 100%;
}


.carousel-indicators .active, .button {
    background: linear-gradient(to right, #e3ddd5, #455977);
    border-radius: 10px;
    padding: 0.1em 5vw;
}
`
