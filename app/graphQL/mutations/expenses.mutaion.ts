import { gql } from '@apollo/client';
export const ADD_EXPENSE = gql`
    mutation AddExpense($input: addExpenseInput!) {
        addExpense(input: $input) {
            id
            amount
            description
            category {
                id
                name
                icon
                type
            }
        }
    }
`
export const UPDATE_EXPENSE = gql`
    mutation UpdateExpense($id: ID!, $input: updateExpenseInput!) {
        updateExpense(id: $id, input: $input) {
            id
            amount
            description
        }
    }
`
export const DELETE_EXPENSE = gql`
    mutation DeleteExpense($id: ID!) {
        deleteExpense(id: $id)
    }
`