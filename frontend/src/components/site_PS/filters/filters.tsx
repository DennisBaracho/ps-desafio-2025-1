'use client'

import style from './style.module.css'
import '../variables.css'

export default function filters() {
  return (
    <>
      <div className={style.container}>
        <img
          src="./images/filter-icon.png"
          alt="Imagem de filtro."
          id={style.filter_image}
        />
        <form className={style.filter_form} method="get">
          <input
            type="text"
            name="name-filter"
            defaultValue="Filtrar por nome..."
            className={style.filter_fields}
            id={style.name_filter}
          />
          <select
            name="select-category"
            id={style.select_category}
            className={style.filter_fields}
          >
            <option value="Carro">Carro</option>
            <option value="Caminhao">Caminhão</option>
            <option value="Moto">Moto</option>
          </select>
          <input
            type="button"
            value="Pesquisar"
            className={style.filter_fields}
            id={style.filter_button}
          />
        </form>
      </div>
    </>
  )
}
