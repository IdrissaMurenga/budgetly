import { gql } from "@apollo/client";

export const GET_USER = gql`
    query getUser {
        me {
            firstName
            lastName
            expenses {
                id
                amount
            }
            incomes {
                id
                amount
            }
        }
    }
`