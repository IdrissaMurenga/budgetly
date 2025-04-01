'use client'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../graphQL/queries/user.query'
import { useRouter } from 'next/navigation'
import { Spinner, Center } from '@chakra-ui/react'
import { useEffect } from 'react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const { loading, error, data } = useQuery(GET_USER)

    useEffect(() => {
        // If no user data or error, redirect to login
        if (!loading && (!data?.me || error)) {
            router.replace('/')
        }
    }, [loading, error, data, router])

    if (loading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    // Only render children if we have user data
    return data?.me ? <>{children}</> : null
}

export default AuthGuard
