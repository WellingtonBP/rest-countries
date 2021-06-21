import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import classes from './Header.module.css'

const darkMode = localStorage.getItem('darkMode')

const Header = () => {
  const [isDark, setTheme] = useState(darkMode)

  useEffect(() => {
    if (isDark) {
      document.documentElement.style.setProperty('--background', '#202c37')
      document.documentElement.style.setProperty('--elements', '#2b3945')
      document.documentElement.style.setProperty('--text', '#ffffffe0')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.style.setProperty('--background', '#fafafa')
      document.documentElement.style.setProperty('--elements', '#ffffff')
      document.documentElement.style.setProperty('--text', '#111517e0')
      localStorage.removeItem('darkMode')
    }
  }, [isDark])

  const toggleThemeHandler = () => setTheme(current => !current)

  return (
    <header className={classes.header}>
      <div className="container">
        <Link to="/rest-countries">Where in the World?</Link>
        <button onClick={toggleThemeHandler} type="button">
          <i className={`fa-moon ${isDark ? 'fas' : 'far'}`}></i>
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
