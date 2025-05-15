'use client'

import { categoryType } from '@/types/category'
import style from './style.module.css'
interface categoryProp {
  category: categoryType
  /* Função que recebe o id da categoria */
  onClick: (id: string) => void 
}

/* Componente que exibe o botão que, ao ser clicado, chama a função onClick */
export default function Filter({ category, onClick }: categoryProp) {
  return (
    <div className={style.container}>
      <button
        className={style.filter_button}
        type="button"
        onClick={() => onClick(category.id)}
      >
        {category.label}
      </button>
    </div>
  )
}
