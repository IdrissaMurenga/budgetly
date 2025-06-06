"use client"
import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

const ExpensesByCategories = () => {
    const chart = useChart({
        data: [
            { name: "windows", value: 400, color: "blue.solid" },
            { name: "mac", value: 300, color: "orange.solid" },
            { name: "linux", value: 300, color: "pink.solid" },
        ],
    })
    return (
        <Chart.Root boxSize="500px" chart={chart} mx="auto">
            <PieChart>
                <Tooltip
                    cursor={false}
                    animationDuration={100}
                    content={<Chart.Tooltip hideLabel />}
                />
                <Pie
                    innerRadius={100}
                    outerRadius={140}
                    data={chart.data}
                    dataKey={chart.key("value")}
                    paddingAngle={8}
                    cornerRadius={4}
                >
                    {chart.data.map((item) => (
                        <Cell key={item.name} fill={chart.color(item.color)} />
                    ))}
                </Pie>
            </PieChart>
        </Chart.Root>
    )
}

export default ExpensesByCategories
