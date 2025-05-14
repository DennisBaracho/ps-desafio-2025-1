'use client'
import { MdDarkMode } from 'react-icons/md'
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
      <li className={navBar.nav_item}>
        <button onClick={changeTheme}>
          <MdDarkMode size={20} />
        </button>
      </li>
    </>
  )
}
