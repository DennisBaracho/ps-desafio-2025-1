'use client'

import { useEffect, useState } from 'react'
import style from './style.module.css'
import { getSession } from 'next-auth/react'
import { useToast } from '@/components/use-toast'
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
            <a href="#">Inicio</a>
          </li>
        </ul>

        <ul className={style.nav_links}>
          <li className={style.nav_item}>
            <a href="#">Veículos</a>
          </li>
        </ul>

        <ul className={style.nav_links}>
          <li className={style.nav_item}>
            <a href="#">Categorias</a>
          </li>

          <li className={style.nav_item}>
            <a href="/admin" className={style.icon_button}>
              {isAuth ? 'Logado' : 'Logar'}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
