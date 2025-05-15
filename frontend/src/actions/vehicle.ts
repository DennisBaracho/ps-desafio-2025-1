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

export async function buyVehicle(id: string) {
  const res = await api('POST', `/buy/${id}`)

  if (!res.error) {
    revalidatePath('/admin/veiculos')
  }
  return JSON.stringify(res)
}

export async function filterVehicle(id: string) {
  const res = await api('GET', `/filter/${id}`)

  if (!res.error) {
    revalidatePath('/admin/veiculos')
  }
  return JSON.stringify(res)
}
>>>>>>> Stashed changes
