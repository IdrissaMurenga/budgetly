import { gql } from "@apollo/client";

export const GET_BUDGET_GOAL = gql`
    query BudgetGoal($month: String!) {
        getBudgetGoal(month: $month) {
            id
            amount
            month
        }
    }
`
