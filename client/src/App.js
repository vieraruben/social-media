import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter/>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
