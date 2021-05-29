import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import CountriesProvider from './store/countries-context'

ReactDOM.render(
  <BrowserRouter>
    <CountriesProvider>
      <App />
    </CountriesProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
