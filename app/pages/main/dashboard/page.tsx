'use client'
import { Container, Dialog, Portal, Flex } from '@chakra-ui/react'
import Details from './Details'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/app/graphQL/queries/user.query'
import { useEffect, useState } from 'react'
import SalaryForm from './SalaryForm'
import StatSummaries from './StatSummaries'
import RecentActivity from './RecentActivity'
import ExpensesOverview from './ExpensesOverview'
import ExpensesByCategories from './ExpensesByCategories'

const Dashboard = () => {
  const { data, loading } = useQuery(GET_USER)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!loading && data?.me && !data?.me?.salary) {
      setOpen(true)
    }
  })
  return (
    <Container>
      <Details />
      <StatSummaries />
      <RecentActivity />
      {/* <Flex p={4}>
          <ExpensesOverview />
          <ExpensesByCategories />
      </Flex> */}
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <SalaryForm />
        </Portal>
      </Dialog.Root>
    </Container>
  )
}

export default Dashboard
