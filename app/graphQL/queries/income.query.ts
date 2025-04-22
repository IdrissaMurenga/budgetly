import { gql } from "@apollo/client";
export const GET_INCOMES = gql`
    query incomes {
        incomes {
            category {
                name
                icon
                type
            }
            id
            amount
            description
            createdAt
        }
    }
`