'use client'
import '../variables.css'
import style from './style.module.css'

export default function buyButton() {
  return (
    <div className={style.container}>
      <input
        type="button"
        defaultValue={'Comprar'}
        className={style.buy_button}
      ></input>
    </div>
  )
}
