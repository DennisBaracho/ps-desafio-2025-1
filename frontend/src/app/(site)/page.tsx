<<<<<<< Updated upstream
export default async function Home() {
  return <></>
=======
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
import Filter from '@/components/site_PS/category_filter/category_filter'
import { categoryType } from '@/types/category'
// import { FaFilter } from 'react-icons/fa6'
// import DarkMode from '@/components/site_PS/dark_mode/dark_mode'
// import BuyButton from '@/componentes/site_PS/buy_button/buy_button'

export default function Home() {
  const [vehicles, setVehicles] = useState<vehicleType[] | undefined>()
  const [categories, setCategories] = useState<categoryType[]>([])

  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response: vehicleRes } = await api<vehicleType[]>(
        'GET',
        `/vehicles`,
      )
      const { response: categoryRes } = await api<categoryType[]>(
        'GET',
        `/categories`,
      )

      if (vehicleRes) {
        setVehicles(vehicleRes)
      } else {
        toast({ title: 'Veículos não encontrados' })
      }

      if (categoryRes) {
        setCategories(categoryRes)
      } else {
        toast({ title: 'Categorias não encontradas' })
      }
    }

    requestData()
  }, [toast])

  async function handleCategoryClick(id: string) {
    const { response } = await api<vehicleType[]>('GET', `/filter/${id}`)

    if (response) {
      setVehicles(response)
    } else {
      toast({ title: 'Nenhum veículo encontrado para essa categoria' })
    }
  }

  return (
    <>
      <div className={style.page}>
        <Navbar logo="./images/logo-dafirma.png" />
        <Hero hero="./images/hero.png" />
        <div className={style.filters}>
          <p className={style.text}>Que frota vamos montar hoje?</p>
          {categories.map((category) => (
            <Filter
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
        <div className={style.wrapper}>
          {vehicles?.map((vehicle: vehicleType, index: number) => (
            <Card vehicle={vehicle} key={index} />
          ))}
        </div>
        <Footer footerLogo="./images/logo-dafirma-white.png" />
      </div>
    </>
  )
>>>>>>> Stashed changes
}
