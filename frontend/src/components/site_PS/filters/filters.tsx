'use client'

import { categoryType } from '@/types/category'
import style from './style.module.css'
interface categoryProp {
  category: categoryType
  onClick: (id: string) => void
}

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
