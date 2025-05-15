'use client'

import '../variables.css'
// Componentes do swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Array ordenado por id com as imagens utilizadas como hero
const heroItems = [
  { id: '1', image: '/images/hero.png' },
  { id: '2', image: '/images/Hero2.png' },
  { id: '3', image: '/images/Hero3.png' },
]
export default function Hero() {
  return (
    <>
      <div>
        <Swiper
        //  Criando e configurando o estilo do swiper
          style={{
            '--swiper-pagination-color': 'var(--primary-orange)',
            '--swiper-pagination-bullet-inactive-color': '#999999',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-bullet-size': '14px',
            '--swiper-pagination-bullet-horizontal-gap': '6px',
          }}
          // Módulos que serão utilizados, pagination e navigation
          modules={[Pagination, Navigation]}
          // Quantidade de imagens a serem exibidas na tela ao mesmo tempo
          slidesPerView={1}
          // Habilita o click nos botões do pagination
          pagination={{ clickable: true }}
          // Deixa de exibir as setas do navigation
          navigation={{ nextEl: 'none' }}
          // Possibilita ir da primeira para a última imagem e vice-versa
          loop={true}
        > 
          {heroItems.map((item) => ( // Mapeia todas as imagens do array, exibindo-as na tela
            <SwiperSlide key={item.id}>
              <img
                src={item.image}
                alt="Carrossel com imagens de veículos Dafirma"
                className={'slide-item'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
