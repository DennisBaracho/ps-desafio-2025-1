'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createCategory(form: FormData) {}

export async function updateCategory(form: FormData) {}

<<<<<<< Updated upstream
export async function destroyCategory(id: string) {}
=======
export async function updateCategory(form: FormData) {
  const res = await api('POST', `/categories/${form.get('id')}`, { data: form })

  if (!res.error) {
    revalidatePath('/admin/categorias')
  }
  return JSON.stringify(res)
}

export async function destroyCategory(id: string) {
  const res = await api('DELETE', `/categories/${id}`)

  if (!res.error) {
    revalidatePath('/admin/categorias')
  }
  return JSON.stringify(res)
}

export async function getCategory() {
  const res = await api('GET', `/categories/`)

  if (!res.error) {
    revalidatePath('/admin/categorias')
  }
  return JSON.stringify(res)
}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
