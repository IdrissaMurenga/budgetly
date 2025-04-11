import { gql } from '@apollo/client';
export const ADD_EXPENSE = gql`
    mutation AddExpense($input: addExpenseInput!) {
        addExpense(input: $input) {
            id
            amount
            description
            category {
                name
                type
            }
        }
    }
`