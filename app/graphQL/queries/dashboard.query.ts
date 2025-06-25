import { gql } from '@apollo/client'

export const GET_DASHBOARD_SUMMARY = gql`
    query GetDashboardSummary {
        getDashboardSummary {
            totalExpenses
            totalIncomes
            totalSavings
            balance
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