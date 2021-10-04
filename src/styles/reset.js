import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans JP', sans-serif;
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
