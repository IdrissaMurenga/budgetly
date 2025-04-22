import { gql } from '@apollo/client'

export const GET_EXPENSES = gql`
    query expenses {
        expenses {
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