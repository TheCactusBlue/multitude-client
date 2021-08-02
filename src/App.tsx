import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import './fonts.css';

import {Routes} from "./routes/router";
import {Provider} from "react-redux";
import {store} from "./store";
import { TitleBar, TitleBarBox } from './components';
import {ThemeProvider} from "styled-components";
import {theme} from "./moekit";

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement);


const App = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <TitleBarBox>
            <TitleBar/>
            <Routes/>
          </TitleBarBox>
        </ThemeProvider>
      </Provider>
    </>
  )
}

render(<App />, mainElement)
