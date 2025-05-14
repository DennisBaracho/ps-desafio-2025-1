'use client'
import '../variables.css'
import style from './style.module.css'
import { vehicleType } from '@/types/vehicle'
// import { api } from '@/services/api'
import { buyVehicle } from '@/actions/vehicle'
// import { useToast } from '@/components/use-toast'
// import { useState } from 'react'

interface vehicleProp {
  vehicle: vehicleType
}

export function buyButton({ vehicle }: vehicleProp) {
  async function buyVehicles(id: string) {
    const response = await buyVehicle(id)
    console.log(response)
  }

  return (
    <div className={style.container}>
      <input
        type="button"
        defaultValue={'Comprar'}
        className={style.buy_button}
        onClick={() => buyVehicles(vehicle.id)}
      ></input>
    </div>
  )
}
