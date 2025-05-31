'use client'
import { useQuery } from "@apollo/client";
import { Box, Spinner, Text, VStack, Heading, Stat, StatLabel, StatHelpText } from "@chakra-ui/react";
import dayjs from "dayjs";
import { GET_BUDGET_GOAL } from "@/app/graphQL/queries/budget.query";

const BudgetDisplay = () => {
    const { data, loading } = useQuery(GET_BUDGET_GOAL, { variables: { month: dayjs().format("YYYY-MM") } })
    if (loading) return <Spinner />;
    return (
    <VStack gap={4} align="stretch">
        <Heading size="md">Budget for {dayjs().format("MMMM YYYY")}</Heading>
        {data?.getBudgetGoal ? (
            <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" bgColor="white">
                <Stat.Label>Amount</Stat.Label>
                <StatHelpText>{data.getBudgetGoal.amount}</StatHelpText>
            </Box>
        ) : (
            <Text>No budget set for this month.</Text>
        )}
    </VStack>
    )
}

export default BudgetDisplay
