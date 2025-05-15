'use client'

import { useEffect, useState } from 'react'
import style from './style.module.css'
import { getSession } from 'next-auth/react'
import { useToast } from '@/components/use-toast'
import { MdAdminPanelSettings } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import DarkMode from '@/components/site_PS/dark_mode/dark_mode'
import '../variables.css'
interface navBarProps {
  logo: string
}

export default function Navbar({ logo }: navBarProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const { toast } = useToast()

  useEffect(() => {
    const requestDataSession = async () => {
      const sessionResponse = await getSession()

      if (sessionResponse) {
        setIsAuth(!!sessionResponse.user)
      } else {
        toast({
          title: 'Você não está logado!',
        })
      }
    }
    requestDataSession()
  }, [toast])

  return (
    <nav className={style.navbar}>
      <div className={style.navbar_nav}>
        <a href="#">
          <img className={style.logo} src={logo} alt="Logo do site Dafirma" />
        </a>

        <ul className={style.nav_links}>
          <li className={style.nav_item}>
            <a href="/admin/veiculos">Veículos</a>
          </li>
        </ul>

        <ul className={style.nav_links}>
          <li className={style.nav_item}>
            <a href="/admin/categorias">Categorias</a>
          </li>

          <li className={style.nav_item}>
            <a href="/admin" className={style.icon_button}>
              {isAuth ? (
                <MdAdminPanelSettings size={30} />
              ) : (
                <FaUser size={20} />
              )}
            </a>
          </li>
          <DarkMode />
        </ul>
      </div>
    </nav>
  )
}
