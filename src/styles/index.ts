import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;

    background-color: whitesmoke;
  }
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
    padding: 0px;
  }
  ul{
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start:0;
  }
`;


