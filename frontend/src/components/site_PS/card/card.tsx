'use client'

import '../variables.css'
import { vehicleType } from '@/types/vehicle'
import style from './style.module.css'
import Button from '../buy_button/buy_button'
interface vehicleProp {
  vehicle: vehicleType
}

export default function Card({ vehicle }: vehicleProp) {
  return (
    <div className={style.card}>
      <img
        src={vehicle.image}
        alt="Imagem do veículo"
        className={style.card_img}
      />
      <div className={style.card_body}>
        <h2 className={style.card_name}>{vehicle.name}</h2>
        <p className={style.card_content}>Marca: {vehicle.brand}</p>
        <p className={style.card_content}>
          Ano de fabricação: {vehicle.model_year}
        </p>
        <p className={style.card_content}>Categoria:{vehicle.category.label}</p>
        <p className={style.card_content}>Em estoque: {vehicle.in_stock}</p>
        <p className={style.card_content}>Preço: {vehicle.price}</p>
        <Button />
      </div>
    </div>
  )
}
