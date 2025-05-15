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
  /* Estados utilizados na função de compra
  buttonValue é o valor exibido no botão de compra, indicando em que estado está: Comprar, Comprado ou Esgotado */
  const [buttonValue, setButtonValue] = useState('Comprar')
  /* amount é utilizado para exibir a quantidade em estoque do veículo */
  const [amount, setAmount] = useState(vehicle.in_stock)
  /* booleano que altera o estado do botão, se false significa que está esgotado, logo desabilitado
  se true significa que ainda é possívele comprar  */
  const [soldOut, setSoldOut] = useState(false)
  /* exibe o que está acontecendo para o usuário em caso de erro ou compra bem sucedida */
  const { toast } = useToast()

  async function buyVehicles(id: string) {
    /* requisição que traz o valor atualizado de estoque após a compra */
    const updatedAmount = await buyVehicle(id)

    /* o type pode ser number (quando a compra é bem sucedida) ou null (quando há erro). caso number,
    atualiza o estoque no Front com base nos valores do banco de dados */
    if (typeof updatedAmount === 'number') {
      setAmount(updatedAmount)

      /* se a quantidade em estoque recebida é menor igual a zero, desabilita o botão e exibe que está esgotado no toast e no botão */
      if (updatedAmount <= 0) {
        setButtonValue('Esgotado')
        setSoldOut(true)
        toast({
          title: 'Produto esgotado!',
          description: 'O veículo não está mais disponível em estoque.',
        })
        /* caso a compra ocorra normalmente, exibe a quantidade em estoque  */
      } else {
        toast({
          title: 'Compra realizada com sucesso!',
          description: `Quantidade em estoque: ${updatedAmount}`,
        }); setButtonValue('Comprado')
      }
      /* em caso de erro, exibe que a compra não foi realizada e que houve um erro */
    } else {
      toast({
        title: 'A compra não foi realizada',
        description: 'Ocorreu um erro ao tentar comprar o veículo.',
      })
      /* como nada ocorreu, não exibe comprado nem esgotado, mantém o valor comprar no botão */
      setButtonValue('Comprar')
    }
  }

  /* faz as alterações de quantidade em estoque e estado do botão ocorrerem em tempo real */
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
