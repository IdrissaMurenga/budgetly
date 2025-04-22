import { gql } from "@apollo/client";
export const GET_EXPENSE_CATEGORIES = gql`
    query categories($type: String!) {
        categories (type: $type) {
            id
            name
            icon
            type
        }
    }
`

export const GET_INCOME_CATEGORIES = gql`
    query categories($type: String!) {
        categories (type: $type) {
            id
            name
            icon
            type
        }
    }
`