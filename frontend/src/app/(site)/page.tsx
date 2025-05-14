'use client'

import { useToast } from '@/components/use-toast'
import { api } from '@/services/api'
import { vehicleType } from '@/types/vehicle'
import { useEffect, useState } from 'react'
import style from './style.module.css'
import Card from '@/components/site_PS/card/card'
import Navbar from '@/components/site_PS/navbar/navbar'
import Footer from '@/components/site_PS/footer/footer'
import Hero from '@/components/site_PS/hero/hero'
import Filter from '@/components/site_PS/filters/filters'
// import BuyButton from '@/componentes/site_PS/buy_button/buy_button'

export default function Home() {
  const [vehicles, setVehicles] = useState<vehicleType[] | undefined>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<vehicleType[]>('GET', `/vehicles`)

      if (response) {
        setVehicles(response)
      } else {
        toast({
          title: 'Veículos não encontrados',
        })
      }
    }
    requestData()
  }, [toast])

  return (
    <>
      <div className={style.page}>
        <Navbar logo="./images/logo-dafirma.png" />
        <Hero hero="./images/hero.png" />
        <Filter />
        <div className={style.wrapper}>
          {vehicles?.map((vehicle: vehicleType, index: number) => (
            <Card vehicle={vehicle} key={index} />
          ))}
        </div>
        <Footer footerLogo="./images/logo-dafirma-white.png" />
      </div>
    </>
  )
}
