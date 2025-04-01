import { gql } from "@apollo/client";

export const SIGNUP = gql`
    mutation signup($input: SignupInput!){
        signup(input: $input){
            user {
                firstName
                lastName
            }
            token
        }
    }

`
export const LOGIN = gql`
    mutation login($input: LoginInput!) {
        login(input: $input) {
            user {
                firstName
                lastName
            }
            token
        }
    }
`
export const LOGOUT = gql`
    mutation Logout {
        logout
    }

`