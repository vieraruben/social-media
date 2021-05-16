import React, {useEffect} from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'
import './App.css';

function App() {
   // This effect runs once, after the first render
   useEffect(() => {
    document.title = "Social Media"
  }, [])
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter/>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
