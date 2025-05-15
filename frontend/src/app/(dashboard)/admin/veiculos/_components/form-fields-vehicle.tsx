'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { categoryType } from '@/types/category'
import { vehicleType } from '@/types/vehicle'
// import { Dialog } from '@radix-ui/react-dialog'
import { useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsVehicleProps {
  vehicle?: vehicleType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsVehicle({
  vehicle,
  readOnly,
  error,
}: FormFieldsVehicleProps) {
  const { pending } = useFormStatus()
  const [categories, setCategories] = useState<categoryType[]>()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  const requestData = async () => {
    try {
      const response = await api('GET', '/categories')
      if (response.error) {
        console.log('Não foi possível obter as categorias.')
      } else {
        setCategories(response.response as categoryType[])
      }
    } catch (e) {
      console.log('Ocorreu um erro inesperado.')
    }
  }

  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {vehicle && (
          <Input defaultValue={vehicle.id} type="category" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="name" required={!vehicle}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do veículo"
            defaultValue={vehicle?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>

        <FormField>
          <Label htmlFor="model_year" required={!vehicle}>
            Ano do veículo
          </Label>
          <Input
            name="model_year"
            id="model_year"
            placeholder="Insira o ano do veículo"
            defaultValue={vehicle?.model_year}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.model_year}
          />
        </FormField>

        <FormField>
          <Label
            htmlFor="image"
            hidden={readOnly && !vehicle?.image}
            required={!vehicle}
          >
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || vehicle?.image}
          />
        </FormField>

        <FormField>
          <Label htmlFor="brand" required={!vehicle}>
            Marca
          </Label>
          <Input
            name="brand"
            id="brand"
            placeholder="Insira a marca do veículo"
            defaultValue={vehicle?.brand}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.brand}
          />
        </FormField>

        <FormField>
          <Select
            disabled={pending || readOnly}
            name="category_id"
            defaultValue={vehicle?.category_id}
          >
            <Label htmlFor="category" required={!vehicle}>
              Categoria
            </Label>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria do veículo" />
            </SelectTrigger>
            <SelectContent id="category_id">
              <SelectGroup id="category_id">
                {categories?.map((category: categoryType, index: number) => (
                  <SelectItem value={category.id} key={index}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormField>

        <FormField>
          <Label htmlFor="in_stock" required={!vehicle}>
            Em estoque
          </Label>
          <Input
            name="in_stock"
            id="in_stock"
            placeholder="Insira a quantidade em estoque"
            defaultValue={vehicle?.in_stock}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.in_stock}
          />
        </FormField>

        <FormField>
          <Label htmlFor="price" required={!vehicle}>
            Preço do veículo
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="Insira o preço do veículo"
            defaultValue={vehicle?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
          />
        </FormField>

        {error?.errors?.category_id && (
          <p className="text-destructive text-xs mt-2">
            {error?.errors?.category_id}
          </p>
        )}
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
