import { createGlobalStyle } from 'styled-components';
export const theme = {
  sidebarBackground: '#363740',
  sidebarHover: '#5b5d6b',
  sidebarInactiveText: '#ffffff80',
  sidebarActiveText: '#fff',
  primary: '#CB149D',
  primaryDark: '#B20F8A',
  background: '#F1F2F6',
  gray: '#9FA2B4',
  border: '#DFE0EB',
  secondary: '#3751FF',
  secondaryDark: '#3146D6'
};

const muliPath = './fonts/Muli/';
const lusitanaPath = './fonts/Lusitana/';
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Muli';
    src: url(${require(muliPath + 'Muli.ttf')}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muli';
    src: url(${require(muliPath + 'Muli-Bold.ttf')}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muli';
    src: url(${require(muliPath + 'Muli-BoldItalic.ttf')}) format('truetype');
    font-weight: bold;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muli';
    src: url(${require(muliPath + 'Muli-Light.ttf')}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muli';
    src: url(${require(muliPath + 'Muli-LightItalic.ttf')}) format('truetype');
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muli';
    src: url(${require(muliPath + 'Muli-Semi-BoldItalic.ttf')}) format('truetype');
    font-weight: 600;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muli';
    src: url(${require(muliPath + 'Muli-SemiBold.ttf')}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  // Lusitana
    @font-face {
    font-family: 'Lusitana';
    src: url(${require(lusitanaPath + 'Lusitana-Regular.ttf')}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
    @font-face {
    font-family: 'Lusitana';
    src: url(${require(lusitanaPath + 'Lusitana-Bold.ttf')}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  body {
    font-family: 'Muli'
  }
  h2 {
    font-family: 'Lusitana'
  }
`;

export default GlobalStyle;