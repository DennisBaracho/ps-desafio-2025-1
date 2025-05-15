'use client'

import '../variables.css'
import { vehicleType } from '@/types/vehicle'
import style from './style.module.css'
import { buyVehicle } from '@/actions/vehicle'
import { useEffect, useState } from 'react'

interface vehicleProp {
  vehicle: vehicleType
}

export default function Card({ vehicle }: vehicleProp) {
  const [buttonValue, setButtonValue] = useState('Comprar')
  const [amount, setAmount] = useState(vehicle.in_stock)
  const [soldOut, setSoldOut] = useState(false)
  async function buyVehicles(id: string) {
    const response = await buyVehicle(id)

    if (response) {
      setAmount((prev) => prev - 1)
      setButtonValue('Comprado')
    } else {
      setButtonValue('Erro')
    }
  }

  useEffect(() => {
    if (amount <= 0) {
      setButtonValue('Esgotado')
      setSoldOut(true)
    }
  }, [amount])

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
        <strong>
          <p className={style.card_content}>Marca: {vehicle.brand}</p>
        </strong>
        <p className={style.card_content}>
          <strong>Ano de fabricação:</strong> {vehicle.model_year}
        </p>
        <p className={style.card_content}>
          <strong>Categoria:</strong> {vehicle.category.label}
        </p>
        <p className={style.card_content}>
          <strong>Em estoque:</strong> {amount}
        </p>
        <p className={style.card_content}>
          <strong>Preço:</strong> R$
          {vehicle.price}
        </p>
        <input
          type="button"
          disabled={soldOut}
          value={buttonValue}
          className={style.buy_button}
          onClick={() => buyVehicles(vehicle.id)}
        ></input>
      </div>
    </div>
  )
}
