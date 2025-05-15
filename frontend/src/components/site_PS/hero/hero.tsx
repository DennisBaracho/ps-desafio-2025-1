'use client'

import '../variables.css'
import style from './style.module.css'
// swiper components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

const heroItems = [
  { id: '1', image: '/images/hero.png' },
  { id: '2', image: '/images/Hero2.png' },
  { id: '3', image: '/images/Hero3.png' },
]
export default function Hero() {
  return (
    <>
      <div className={style.hero_container}>
        <Swiper
          style={{
            '--swiper-pagination-color': 'var(--primary-orange)',
            '--swiper-pagination-bullet-inactive-color': '#999999',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-bullet-size': '14px',
            '--swiper-pagination-bullet-horizontal-gap': '6px',
          }}
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{ nextEl: 'none' }}
          loop={true}
        >
          {heroItems.map((item) => (
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
