'use client'

import '../variables.css'
import style from './style.module.css'
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'

interface footerProps {
  footerLogo: string
}

export default function footer({ footerLogo }: footerProps) {
  return (
    <>
      <footer className={style.footer}>
        <div className={style.footer_content}>
          <div className={style.contacts}>
            <img
              className={style.footer_logo}
              src={footerLogo}
              alt="Logo Dafirma branca"
            />
            <div className={style.social_media}>
              <a href="#" className={style.social_link} id="Instagram">
                <FaInstagram size={40} />
              </a>
              <a href="#" className={style.social_link} id="Facebook">
                <FaFacebook size={40} />
              </a>
              <a href="#" className={style.social_link} id="Linkedin">
                <FaLinkedin size={40} />
              </a>
            </div>
          </div>
          <ul className={style.list}>
            <li>
              <h1 className={style.sobre_link}>Sobre nós</h1>
            </li>
            <li>
              <p className={style.sobre_text}>
                Concessionária de automóveis focada em veículos para trabalho.
              </p>
            </li>
            <li>
              <a href="#" className={style.sobre_link}>
                Agende um orçamento presencial!
              </a>
            </li>
          </ul>

          <ul className={style.list} id={style.right_footer}>
            <li>
              <h1 className={style.sobre_link}>Endereço</h1>
            </li>
            <li>
              <p className={style.sobre_text}>
                Rua fictícia, bairro inexistente, 221B.
              </p>
            </li>
            <li>
              <h1 className={style.sobre_link}>Nossos horários</h1>
            </li>
            <li>
              <p className={style.sobre_text}>Terça a sábado: 08:00 - 19:00</p>
            </li>
          </ul>
        </div>
        <div className={style.copyright}>2025, Feito por Dennis Baracho</div>
      </footer>
    </>
  )
}
