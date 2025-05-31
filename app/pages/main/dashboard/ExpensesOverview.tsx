"use client"
import { useState } from "react";
import { Cell, LabelList, Pie, PieChart, Tooltip, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Stack, Heading, Text, ButtonGroup, Button } from "@chakra-ui/react";
import { Chart, useChart } from "@chakra-ui/charts";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_SUMMARY } from "@/app/graphQL/queries/dashboard.query";
import { parseISO ,format } from "date-fns";

const ExpensesOverview = () => {
    const [range , setRange] = useState<'last7days' | 'last24hours' | 'last30days'>('last30days')
    const { data } = useQuery(GET_DASHBOARD_SUMMARY);
    const summary = data?.getDashboardSummary || [];
    const chartData = summary?.[range] || [];
    const chart = useChart({
        data: chartData,
        series: [{ name: "total", color: "teal", id: "id" }],
    })
    console.log("last7days", chartData)
    return (
        <Stack>
            <Heading>Expenses Overview</Heading>
            <ButtonGroup>
                <Button
                    bgColor='bg-secondary'
                    color="white"
                    variant={range === 'last24hours' ? 'solid' : 'outline'}
                    onClick={() => setRange('last24hours')}
                >
                    Last 24 Hours
                </Button>
                <Button
                    bgColor='bg-secondary'
                    color="white"
                    variant={range === 'last7days' ? 'solid' : 'outline'}
                    onClick={() => setRange('last7days')}
                >
                    Last 7 Days
                </Button>
                <Button
                    bgColor='bg-secondary'
                    color="white"
                    variant={range === 'last30days' ? 'solid' : 'outline'}
                    onClick={() => setRange('last30days')}
                >
                    Last 30 Days
                </Button>
            </ButtonGroup>
            <Chart.Root maxH="md" minW='40rem' chart={chart}>
                <BarChart barCategoryGap="0" barSize={90} data={chart.data}>
                    <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
                    <XAxis
                        axisLine={false}
                        tickLine={false}
                        dataKey='id'
                        tickFormatter={(value) => {
                            try {
                                return format(parseISO(value), 'MMM d')
                            } catch (error) {
                                console.error("Invalid date:", value)
                                return value
                            }
                        }}
                    />
                    <Tooltip
                        cursor={{ fill: chart.color("bg.muted") }}
                        animationDuration={100}
                        content={<Chart.Tooltip />}
                    />
                    {chart.series.map((item) => (
                        <Bar
                            radius={10}
                            key={item.name}
                            dataKey={chart.key(item.name)}
                            fill={chart.color(item.color)}
                            stroke={chart.color("bg")}
                        />
                    ))}
                </BarChart>
            </Chart.Root>
        </Stack>
    )
}

export default ExpensesOverview
