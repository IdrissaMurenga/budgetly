'use client'
import { useQuery } from "@apollo/client"
import { GET_DASHBOARD_SUMMARY } from "@/app/graphQL/queries/dashboard.query"
import { GET_USER } from '@/app/graphQL/queries/user.query';
import { Box, Stat, Text, Spinner, Heading, HStack, Dialog, Button, Portal } from "@chakra-ui/react";
import { formatAmount } from "@/app/utils/formatAmount";
import SalaryForm from "./SalaryForm";

const Details = () => {
    const { data, loading, error } = useQuery(GET_DASHBOARD_SUMMARY)
    const { data: user } = useQuery(GET_USER);

    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">Error: {error.message}</Text>;

    const { balance } = data.getDashboardSummary
    const salary = user?.me?.salary?.amount || 0
    const currency = user?.me?.salary?.currency
    return (
        <HStack pb={4} justifyContent={{base:'center',md:'space-between'}} alignItems={'center'} flexWrap='wrap' gap={4}>
            <Heading display='flex' gap={2} fontSize='2xl'>
                Welcome, <Text fontWeight='bold' color='bg-secondary'>{user?.me?.lastName}</Text>
            </Heading>
            {!salary && !balance ?
                (
                    <HStack alignItems='center' justifyContent='center' >
                        <Text fontWeight='bold'>Add Your Salary To Continue</Text>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button variant='outline' colorPalette='blue' bgColor='bg-secondary' color='white' size='xs'>
                                    Add Salary
                                </Button>
                            </Dialog.Trigger>
                            <Portal>
                                <SalaryForm />
                            </Portal>
                        </Dialog.Root>
                    </HStack>
                )
                :
                (
                <HStack gap={8}>
                    <Stat.Root>
                        <Stat.Label color='text-third'>Salary</Stat.Label>
                        <Stat.ValueText color='bg-secondary'>{formatAmount(salary, currency)}</Stat.ValueText>
                    </Stat.Root>
                    <Stat.Root>
                        <Stat.Label color='text-third'>Current Balance</Stat.Label>
                        <Stat.ValueText color='bg-secondary'>{formatAmount(balance, currency)}</Stat.ValueText>
                    </Stat.Root>
                </HStack>
            )}
        </HStack>
    )
}

export default Details
