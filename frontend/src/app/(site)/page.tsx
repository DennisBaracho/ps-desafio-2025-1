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
import Filter from '@/components/site_PS/filters/filters'
import { categoryType } from '@/types/category'
// swiper components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

// swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
export default function Home() {
  const [vehicles, setVehicles] = useState<vehicleType[] | undefined>()
  // Utilizado na funcionalidade extra de filtro, busca todas as categorias
  const [categories, setCategories] = useState<categoryType[]>([])

  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      // Obtém todos os veículos por meio de uma requisição a api
      const { response: vehicleRes } = await api<vehicleType[]>(
        'GET',
        `/vehicles`,
      )
      // Obtém todos as categorias por meio de uma requisição a api
      const { response: categoryRes } = await api<categoryType[]>(
        'GET',
        `/categories`,
      )

      // Se houver uma resposta para a obtenção de veículos, armazena-os em vehicles. se não, comunica erro
      if (vehicleRes) {
        setVehicles(vehicleRes)
      } else {
        toast({ title: 'Veículos não encontrados' })
      }

      // Se houver uma resposta para a obtenção de veículos, armazena-os em vehicles. se não, comunica erro
      if (categoryRes) {
        setCategories(categoryRes)
      } else {
        toast({ title: 'Categorias não encontradas' })
      }
    }

    // Executa a função novamente
    requestData()
  }, [toast])

  // Função que recebe o id da categoria clicada
  async function handleCategoryClick(id: string) {
    // Requisita a api de filtro de veículos, obtendo veículos com base no id da categoria clicada
    const { response } = await api<vehicleType[]>('GET', `/filter/${id}`)

    // Se obtiver resposta, guarda os veículos em vehicles. se não, avisa o erro
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
              Que frota vamos montar hoje?
              <br /> Arraste para o lado para mais opções.
            </p>
          </div>
          <div className={style.swiper}>
            <Swiper // Inicializa o Swiper com módulo de navigation, exibe botões de 4 categorias ao mesmo tempo
              modules={[Navigation]}
              slidesPerView={4}
              navigation={{ nextEl: 'none' }}
              loop={true}
            >
              {categories.map((category) => ( // Cria os componentes de filtro com base nas categorias recebidas em requestData
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
          {vehicles?.map((vehicle: vehicleType, index: number) => ( // Cria os cards dos veículos com os dados obtidos em requestData, estes podem ser filtrados pelo filterVehicles caso algum dos botões seja clicado.
            <Card vehicle={vehicle} key={index} />
          ))}
        </div>
        <Footer footerLogo="./images/logo-dafirma-white.png" />
      </div>
    </>
  )
>>>>>>> Stashed changes
}
