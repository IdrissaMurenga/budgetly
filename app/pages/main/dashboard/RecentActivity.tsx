'use client'
import { Box, Heading, Stack, Table, Text } from "@chakra-ui/react"
import { useQuery } from "@apollo/client"
import { GET_RECENT_ACTIVITY } from "@/app/graphQL/queries/dashboard.query"
import { formatAmount } from "@/app/utils/formatAmount"
import { useSalaryCurrency } from "@/app/context/SalaryCurrency"
import { format } from "date-fns"

const RecentActivity = () => {
    const { data, loading, error } = useQuery(GET_RECENT_ACTIVITY)
    const { currency } = useSalaryCurrency()
    if (loading) return <Text>Loading...</Text>
    if (error) return <Text color="red.500">Error: {error.message}</Text>
    const recentActivity = data?.getRecentActivity
    console.log('recent activity', recentActivity)
    return (
        <Stack py={4}>
            <Heading size='xl' fontWeight='bold' color='text-secondary' >Recent Activity</Heading>
            <Table.Root bgColor='white' variant='outline' rounded='md' size='sm'>
                <Table.Header>
                    <Table.Row fontSize='md' w='60px' mx='auto'>
                        <Table.ColumnHeader fontWeight='bold' textAlign='center'>Type</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight='bold' textAlign='center'>Amount</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight='bold' textAlign='center'>Description</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight='bold' textAlign='center'>Category</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight='bold' textAlign='center'>Date</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {recentActivity.map((item: any) => (
                        <Table.Row key={item.id} p={4} >
                            {item.type === 'expense' ?
                                <Table.Cell>
                                    <Text color='white' bgColor='red.500' px='.2rem' rounded='.2rem' textAlign='center'>{item.type}</Text>
                                </Table.Cell>
                                :
                                <Table.Cell>
                                    <Text color='white' bgColor='green.500' px='.2rem' rounded='.2rem' textAlign='center'>{item.type}</Text>
                                </Table.Cell>
                            }
                            <Table.Cell textAlign='center'>{formatAmount(item.amount, currency)}</Table.Cell>
                            <Table.Cell textAlign='center'>{item.description}</Table.Cell>
                            <Table.Cell textAlign='center'>{item.category.name}</Table.Cell>
                            <Table.Cell textAlign='center'>
                                {format(new Date(Number(item.createdAt)), 'dd MMM yyyy')}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Stack>
    )
}

export default RecentActivity
