'use client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

// Set the GraphQL API endpoint
const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI, //graphql endpoint
    credentials: 'include',// enable cookies support
});

// Create a new Apollo Client instance
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
        query: {
            fetchPolicy: 'network-only',
        },
        mutate: {
            fetchPolicy: 'no-cache',
        },
    }
})

export const ApolloProviderWrapper = ({children}: {children:React.ReactNode}) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
