import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App'
import { LanguageProvider } from './context/LanguageContext'
import { RouterProvider } from './context/RouterContext'
import './styles/base.css'
import './styles/components.css'
import './styles/responsive.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </RouterProvider>
  </React.StrictMode>,
)
