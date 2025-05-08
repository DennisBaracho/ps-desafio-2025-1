import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import ListCategories from './_components/list-categories'
import { Suspense } from 'react'
import { MdCategory } from 'react-icons/md'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <MdCategory />
          Categorias
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua categorias.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense>
          <ListCategories />
        </Suspense>
      </DashboardMain>
    </>
  )
}
