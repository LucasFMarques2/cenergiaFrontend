import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        top: 0;
        box-sizing: border-box;
    }

    :focus{
        outline: 0;
        box-sizing: 0 0 0 2px ${({theme}) => theme.COLORS.purple};
    }

    body{
        background-color: ${({theme}) => theme.COLORS.white};
        color: ${({theme}) => theme.COLORS.gray_800};
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
    }

    body, input, textarea, button{
        font: 400 1rem Roboto, sans-serif;
    }
`