'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createVehicle(form: FormData) {}

export async function updateVehicle(form: FormData) {}

<<<<<<< Updated upstream
export async function destroyVehicle(id: string) {}
=======
export async function updateVehicle(form: FormData) {
  const res = await api('POST', `/vehicles/${form.get('id')}`, { data: form })

  if (!res.error) {
    revalidatePath('/admin/veiculos')
  }
  return JSON.stringify(res)
}

export async function destroyVehicle(id: string) {
  const res = await api('DELETE', `/vehicles/${id}`)

  if (!res.error) {
    revalidatePath('/admin/veiculos')
  }
  return JSON.stringify(res)
}

// Action utilizada para reduzir o número em estoque de um veículo especificado por id, entrega um numeral, que é utilizado na funcionalidade de compra
export async function buyVehicle(id: string): Promise<number | null> {
  const res = await api('POST', `/buy/${id}`)

  if (!res.error) {
    return res.response as number
  }
  return null
}

// Action utilizada para obter apenas os veículos com o id especificado, utilizada na funcionalidade extra de filtro
export async function filterVehicle(id: string) {
  const res = await api('GET', `/filter/${id}`)

  if (!res.error) {
    revalidatePath('/admin/veiculos')
  }
  return JSON.stringify(res)
}
>>>>>>> Stashed changes
