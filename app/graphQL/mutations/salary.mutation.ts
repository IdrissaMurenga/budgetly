import { gql } from "@apollo/client";

export const SET_SALARY = gql`
    mutation AddSalary($input: SalaryInput!) {
        addSalary(input: $input) {
            id
            amount
            currency
        }
    }
`