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
import { categoryType } from '@/types/category'
// swiper components
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Navigation } from 'swiper/modules'

// swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
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
        <Hero />

        <div className={style.filters}>
          <div className={style.text}>
            <p>
              Que frota vamos montar hoje?<br/> Arraste para o lado para mais opções.
            </p>
          </div>
          <div className={style.swiper}>
            <Swiper
              modules={[Navigation, EffectCards]}
              slidesPerView={4}
              navigation={{ nextEl: 'none' }}
              loop={true}
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Filter
                    key={category.id}
                    category={category}
                    onClick={handleCategoryClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
}
