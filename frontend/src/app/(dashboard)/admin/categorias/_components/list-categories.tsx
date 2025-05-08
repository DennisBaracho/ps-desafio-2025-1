import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/dashboard/table'

import { api } from '@/services/api'
import { Button } from '@/components/button'
import { categoryType } from '@/types/category'
import { LuInfo, LuPen, LuCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateCategory } from './dialog-update-category'
import { DialogCategoryDelete } from './dialog-delete-category'
import { DialogInformationCategory } from './dialog-information-category'
import { DialogCreateCategory } from './dialog-create-category'

export default async function ListCategory() {
  const { response } = await api<categoryType[]>('GET', '/categories')

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as categorias.
      </DashboardContainer>
    )
  }

  const categories: categoryType[] = response

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateCategory>
          <Button size="sm">
            <LuCircle />
            Nova categoria
          </Button>
        </DialogCreateCategory>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category: categoryType, index: number) => (
              <TableRow key={index}>
                <TableCell>{category.label}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationCategory id={category.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCategory>
                  <DialogUpdateCategory id={category.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCategory>
                  <DialogCategoryDelete id={category.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogCategoryDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!categories.length && (
            <TableCaption>Nenhuma categoria encontrada.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
