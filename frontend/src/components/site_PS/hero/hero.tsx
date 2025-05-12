'use client'

import '../variables.css'
import style from './style.module.css'

interface heroProps {
  hero: string
}

export default function Hero({ hero }: heroProps) {
  return (
    <>
      <div className={style.hero_wrapper}>
        <img className={style.hero_image} src={hero} alt="Hero Dafirma" />
        <div className={style.hero_text}>
          <p>Aqui, todo veículo tem propósito. E todo cliente, respeito.</p>
        </div>
      </div>
    </>
  )
}
