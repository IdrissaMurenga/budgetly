'use client'
import { Container, Dialog, Portal, Flex, Text, Button, HStack } from '@chakra-ui/react'
import { GoPlus } from "react-icons/go";
import Details from './Details'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/app/graphQL/queries/user.query'
import { useEffect, useState } from 'react'
import SalaryForm from './SalaryForm'
import StatSummaries from './StatSummaries'
import RecentActivity from './RecentActivity'
import ExpensesOverview from './ExpensesOverview'
import ExpensesByCategories from './ExpensesByCategories'
import EmptyPage from '@/app/components/EmptyPage'
import OverviewExpenses from './OverviewExpenses';

const Dashboard = () => {
  const { data, loading } = useQuery(GET_USER)
  // const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   if (!loading && data?.me && !data?.me?.salary) {
  //     setOpen(true)
  //   }
  // },[])

  return (
    <Container py={4}>
      <Details />
      {!loading && (!data?.me?.expenses?.length && !data?.me?.incomes?.length) ?
        (
        <EmptyPage />
      ) 
      :
      (   
        <>
          <StatSummaries />
            <RecentActivity />
            <OverviewExpenses />
          {/* <Flex p={4}>
              <ExpensesOverview />
              <ExpensesByCategories />
          </Flex> */}
        </>
      )}
    </Container>
  )
}

export default Dashboard
