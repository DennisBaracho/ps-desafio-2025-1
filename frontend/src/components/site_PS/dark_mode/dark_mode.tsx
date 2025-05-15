'use client'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useEffect, useState } from 'react'
import navBar from '@/components/site_PS/navbar/style.module.css'

export default function DarkMode() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function changeTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <ul className={navBar.nav_links}>
        <li className={navBar.nav_item}>
          <button onClick={changeTheme}>
            {theme === 'light' ? (
              <MdDarkMode size={20} />
            ) : (
              <MdLightMode size={20} />
            )}
          </button>
        </li>
      </ul>
    </>
  )
}
