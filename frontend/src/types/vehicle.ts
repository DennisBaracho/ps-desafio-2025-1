import { categoryType } from './category'

export type vehicleType = {
  id: string
  name: string
  image: string
  brand: string
  model_year: number
  in_stock: number
  price: number
  category_id: string
  category: categoryType
  created_at: Date
  update_at: Date
}
