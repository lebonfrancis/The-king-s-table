import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #1a1a1a;
    color: #f0f0f0;
    font-family: 'MedievalSharp', cursive;
    overflow: hidden;
    user-select: none;
  }

  @font-face {
    font-family: 'MedievalSharp';
    src: url('/assets/fonts/MedievalSharp.ttf') format('truetype');
  }
`;
