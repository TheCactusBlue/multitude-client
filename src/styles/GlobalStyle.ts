import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 14px;
    color: #dcddde;
  }
  
  body, * {
    font-family: 'Inter', serif;
    // font-family: 'Open Sans', serif;
  }
`
