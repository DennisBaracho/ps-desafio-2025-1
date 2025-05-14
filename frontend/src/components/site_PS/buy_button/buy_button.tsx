import { buyVehicle } from '@/actions/vehicle'
import { useState, useEffect } from 'react'
import style from '@/components/sty'

export default function BuyButton({ vehicleId, initialStock }: BuyButtonProps) {
  const [amount, setAmount] = useState(initialStock)
  const [buttonValue, setButtonValue] = useState('Comprar')
  const [soldOut, setSoldOut] = useState(false)

  async function handleBuy() {
    if (amount <= 0) return
    setAmount((prev) => prev - 1)
    setButtonValue('Comprado')
    const response = await buyVehicle(vehicleId)
    console.log(response)
  }

  useEffect(() => {
    if (amount <= 0) {
      setButtonValue('Esgotado')
      setSoldOut(true)
    }
  }, [amount])

  return (
    <>
      <p className={style.card_content}>Em estoque: {amount}</p>
      <input
        type="button"
        disabled={soldOut}
        value={buttonValue}
        className={style.buy_button}
        onClick={handleBuy}
      />
    </>
  )
}
