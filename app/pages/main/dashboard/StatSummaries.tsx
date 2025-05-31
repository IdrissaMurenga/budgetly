'use client'
import { useQuery } from "@apollo/client"
import { GET_DASHBOARD_SUMMARY } from "@/app/graphQL/queries/dashboard.query"
import { GET_USER } from '@/app/graphQL/queries/user.query';
import { Box, Stat, Text, Spinner, HStack, Icon, Grid, Progress } from "@chakra-ui/react";
import { formatAmount } from "@/app/utils/formatAmount";
import { HiDownload } from "react-icons/hi";
import { TbMoneybag, TbPigMoney } from "react-icons/tb";
import { MdDone } from "react-icons/md";

const StatSummaries = () => {
    const { data, loading, error } = useQuery(GET_DASHBOARD_SUMMARY)
    const { data: user } = useQuery(GET_USER);

    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">Error: {error.message}</Text>;

    const { totalExpenses, totalIncomes, totalSavings, budgetGoal } = data.getDashboardSummary
    const currency = user?.me?.salary?.currency
    const cards = [
      { icon: HiDownload , label: "Total Expenses", value: totalExpenses, iconBgColor: '#fff6eb', iconColor: 'red' },
      { icon: TbMoneybag , label: "Total Income", value: totalIncomes, iconBgColor: '#ebfcf5', iconColor: '#46bb86'  },
      { icon: TbPigMoney , label: "Total Savings", value: totalSavings, iconBgColor: '#eef6ff', iconColor: '#84b4fd' },
      { icon: MdDone, label: "Budget Goal", value: budgetGoal, iconBgColor: '#edfdf4', iconColor: '#46bb86' },
    ]
    const percentage = budgetGoal ? Math.min((totalSavings / budgetGoal) * 100, 100) : 0;
    return (
      <Grid pt={4} gap={6} templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} >
        {cards.map((card) => (
          <Stat.Root key={card.label} bg='white' color="white" p={{base:'4px',md:'16px'}} borderRadius="xl">
            <HStack gap={2} flexDirection={{ base: 'column', md: 'row' }}>
              <Box bgColor={card.iconBgColor} p='0.5rem'rounded='full' >
                <Icon as={card.icon} size='xl' color={card.iconColor} fontWeight='bold'   />
              </Box>
              <Stat.Root>
                <Stat.Label>{card.label}</Stat.Label>
                <Stat.ValueText fontSize='xl' fontWeight='extrabold' color={card.iconColor}>{formatAmount(card.value, currency)}</Stat.ValueText>
                {/* {card.label === "Budget Goal" && (
                  <Progress.Root>
                    <Progress.Track>
                      <Progress.Range bgColor='text-secondary' width={`${percentage.toFixed(0)}%`} transition="width 0.4s ease" />
                      <Text fontSize="xs" color="gray.500" position="absolute" top="-5" right="0" opacity={0}
                        _groupHover={{ opacity: 1 }} transition="opacity 0.3s"
                      >
                        {percentage.toFixed(0)}%
                      </Text>
                    </Progress.Track>
                  </Progress.Root>
                )} */}
              </Stat.Root>
            </HStack>
          </Stat.Root>
        ))}
      </Grid>
    )
}

export default StatSummaries
