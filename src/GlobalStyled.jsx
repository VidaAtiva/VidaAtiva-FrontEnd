import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
      max-width: 100vw;
      min-height: 100vh;
      background: rgb(245,248,249);
      background: linear-gradient(145deg, rgba(245,248,249,1) 0%, rgba(234,242,252,1) 100%);
    }
    #root{
      min-height: 100%;
    }
`;
