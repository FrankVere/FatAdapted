import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body {
    font-family: 'Roboto Flex', sans-serif;
    margin: 0;
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
