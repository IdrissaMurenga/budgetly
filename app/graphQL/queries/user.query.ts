import { gql } from "@apollo/client";

export const GET_USER = gql`
    query getUser {
        me {
            firstName
            lastName
            salary {
                id
                amount
                currency
            }
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