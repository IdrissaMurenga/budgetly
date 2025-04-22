import { gql } from "@apollo/client";
export const ADD_INCOME = gql`
    mutation AddIncome($input: addIncomeInput!) {
        addIncome(input: $input) {
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
export const UPDATE_INCOME = gql`
    mutation UpdateIncome($id: ID!, $input: updateIncomeInput!) {
        updateIncome(id: $id, input: $input) {
            id
            amount
            description
        }
    }
`
export const DELETE_INCOME = gql`
    mutation DeleteIncome($id: ID!) {
        deleteIncome(id: $id)
    }
`