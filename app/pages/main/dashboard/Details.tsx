'use client'
import { useQuery } from "@apollo/client"
import { GET_DASHBOARD_SUMMARY } from "@/app/graphQL/queries/dashboard.query"
import { GET_USER } from '@/app/graphQL/queries/user.query';
import { Box, Stat, Text, Spinner, Heading, HStack, Flex, Stack } from "@chakra-ui/react";
import { formatAmount } from "@/app/utils/formatAmount";

const Details = () => {
    const { data, loading, error } = useQuery(GET_DASHBOARD_SUMMARY)
    const { data: user } = useQuery(GET_USER);

    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">Error: {error.message}</Text>;

    const { salaryCurrentBalance } = data.getDashboardSummary
    const salary = user?.me?.salary?.amount || 0
    const currency = user?.me?.salary?.currency
    return (
        <HStack p={2} justifyContent={{base:'center',md:'space-between'}} flexWrap='wrap'  gap={4}>
            <Heading display='flex' gap={2} fontSize='2xl'>
                Welcome, <Text fontWeight='bold'>{user?.me?.lastName}</Text>
            </Heading>
            <HStack gap={8}>
                <Stat.Root>
                    <Stat.Label color='text-third'>Salary</Stat.Label>
                    <Stat.ValueText>{formatAmount(salary, currency)}</Stat.ValueText>
                </Stat.Root>
                <Stat.Root>
                    <Stat.Label color='text-third'>Current Balance</Stat.Label>
                    <Stat.ValueText>{formatAmount(salaryCurrentBalance, currency)}</Stat.ValueText>
                </Stat.Root>
            </HStack>
        </HStack>
    )
}

export default Details
