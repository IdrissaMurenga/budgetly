import { gql } from '@apollo/client'

export const GET_DASHBOARD_SUMMARY = gql`
    query GetDashboardSummary {
        getDashboardSummary {
            totalExpenses
            totalIncomes
            totalSavings
            salaryCurrentBalance
            budgetGoal
            budgetProgress
            last7days {
                id
                total
            }
            last24hours {
                id
                total
            }
            last30days {
                id
                total
            }
            pieChartData {
                total
                category{
                    name
                }
            }
        }
    }
`
export const GET_RECENT_ACTIVITY = gql`
    query getRecentActivity {
        getRecentActivity {
            id
            type
            amount
            description
            category{
                name
                icon
            }
            createdAt
        }
    }
`