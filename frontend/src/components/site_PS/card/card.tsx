'use client'

import '../variables.css'
import { vehicleType } from '@/types/vehicle'
import style from './style.module.css'
import { buyVehicle } from '@/actions/vehicle'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface vehicleProp {
  vehicle: vehicleType
}

export default function Card({ vehicle }: vehicleProp) {
  const [buttonValue, setButtonValue] = useState('Comprar')
  const [amount, setAmount] = useState(vehicle.in_stock)
  const [soldOut, setSoldOut] = useState(false)
  const { toast } = useToast()

  async function buyVehicles(id: string) {
    setButtonValue('Comprado')

    const updatedAmount = await buyVehicle(id)

    if (typeof updatedAmount === 'number') {
      setAmount(updatedAmount)

      if (updatedAmount <= 0) {
        setButtonValue('Esgotado')
        setSoldOut(true)
        toast({
          title: 'Produto esgotado!',
          description: 'O veículo não está mais disponível em estoque.',
        })
      } else {
        toast({
          title: 'Compra realizada com sucesso!',
          description: `Quantidade em estoque: ${updatedAmount}`,
        })
      }
    } else {
      toast({
        title: 'A compra não foi realizada',
        description: 'Ocorreu um erro ao tentar comprar o veículo.',
      })
      setButtonValue('Comprar')
    }
  }

  useEffect(() => {
    if (amount <= 0) {
      setButtonValue('Esgotado')
      setSoldOut(true)
    } else {
      setSoldOut(false)
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
        <p className={style.card_content}>Marca: {vehicle.brand}</p>
        <p className={style.card_content}>
          Ano de fabricação: {vehicle.model_year}
        </p>
        <p className={style.card_content}>
          Categoria: {vehicle.category.label}
        </p>
        <p className={style.card_content}>Em estoque: {amount}</p>
        <p className={style.card_content}>Preço: R${vehicle.price}</p>
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
