import { gql } from "@apollo/client";

export const GET_SALARY = gql`
    query GetSalary {
        salary {
            id
            amount
            currency
        }
    }
`