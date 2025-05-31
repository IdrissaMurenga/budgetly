import { gql } from "@apollo/client";

export const SET_BUDGET_GOAL = gql`
    mutation SetBudgetGoal($input: BudgetInput!) {
        setBudgetGoal(input: $input) {
            id
            amount
            month
            createdAt
            savingsGoal
        }
    }
`