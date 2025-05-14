'use client'

import '../variables.css'
import { vehicleType } from '@/types/vehicle'
import style from './style.module.css'
import { buyVehicle } from '@/actions/vehicle'

interface vehicleProp {
  vehicle: vehicleType
}

export default function Card({ vehicle }: vehicleProp) {
  async function buyVehicles(id: string) {
    const response = await buyVehicle(id)
    console.log(response)
  }
  return (
    <div className={style.card}>
      <div className={style.container_image_name}>
        <img
          src={vehicle.image}
          alt="Imagem do veículo"
          className={style.card_img}
        />
        <h2 className={style.card_name}>{vehicle.name}</h2>
      </div>
      <div className={style.card_body}>
        <p className={style.card_content}>Marca: {vehicle.brand}</p>
        <p className={style.card_content}>
          Ano de fabricação: {vehicle.model_year}
        </p>
        <p className={style.card_content}>Categoria:{vehicle.category.label}</p>
        <p className={style.card_content}>Em estoque: {vehicle.in_stock}</p>
        <input
          type="button"
          defaultValue={'Comprar'}
          className={style.buy_button}
          onClick={() => buyVehicles(vehicle.id)}
        ></input>
      </div>
    </div>
  )
}
