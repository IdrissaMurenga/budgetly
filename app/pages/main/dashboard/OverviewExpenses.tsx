'use client'
import { useState } from "react"
import { useQuery } from "@apollo/client";
import { parseISO ,format } from "date-fns";
import { Stack, Heading, Button, ButtonGroup } from "@chakra-ui/react"
import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { GET_DASHBOARD_SUMMARY } from "@/app/graphQL/queries/dashboard.query";

const OverviewExpenses = () => {
  const [range, setRange] = useState<'last7days' | 'last24hours' | 'last30days'>('last30days');
  const { data } = useQuery(GET_DASHBOARD_SUMMARY);
  const summary = data?.getDashboardSummary || [];
  const chartData = summary?.[range] || [];
  const chart = useChart({
    data: chartData,
    series: [
      { name: "total", color: "blue.solid" },
    ],
  })
  return (
    <Stack bgColor='white' p={4} borderRadius='md' maxW='47rem'>
      <Heading size='xl' fontWeight='bold' color='bg-secondary'>Expenses Overview</Heading>
      <ButtonGroup p={2}>
          <Button
              bgColor={range === 'last24hours' ? 'bg-secondary' : 'gray.200'}
              variant={range === 'last24hours' ? 'solid' : 'outline'}
              onClick={() => setRange('last24hours')}
          >
              Last 24 Hours
          </Button>
          <Button
              bgColor={range === 'last7days' ? 'bg-secondary' : 'gray.200'}
              variant={range === 'last7days' ? 'solid' : 'outline'}
              onClick={() => setRange('last7days')}
          >
              Last 7 Days
          </Button>
          <Button
              bgColor={range === 'last30days' ? 'bg-secondary' : 'gray.200'}
              variant={range === 'last30days' ? 'solid' : 'outline'}
              onClick={() => setRange('last30days')}
          >
              Last 30 Days
          </Button>
      </ButtonGroup>
      <Chart.Root maxH="sm" chart={chart}>
        <BarChart data={chart.data}>
          <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
          <XAxis
            tickLine={false}
            // dataKey={chart.key("type")}
            stroke={chart.color("border")}
          />
          <YAxis tickLine={false} stroke={chart.color("border")} />
          <Tooltip
            cursor={{ fill: chart.color("bg.muted") }}
            animationDuration={100}
            content={<Chart.Tooltip />}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="top"
            wrapperStyle={{ paddingLeft: 30 }}
            content={<Chart.Legend orientation="vertical" />}
          />
          {chart.series.map((item) => (
            <Bar
              isAnimationActive={false}
              key={item.name}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
            />
          ))}
        </BarChart>
      </Chart.Root>
    </Stack>
  )
}

export default OverviewExpenses
