import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body {
    font-family: 'Roboto Flex', sans-serif;
    margin: 0;
}

//loading spinner //

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #fff;
  border-color: #333 transparent #333 transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}


.nav-buttons {
    list-style-type: none;
    background-color: #333;
  }

  .nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-list a {
    font-weight: 600;
    display: block;
    color: white;
    text-align: center;
    padding-right: 15px;
    text-decoration: none; 
  }

  .nav-links {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    justify-content: center;
    font-size: 12px;
  }

`;
